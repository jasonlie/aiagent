// Gmail API 测试脚本
// 注意：此脚本仅用于演示目的，需要配置正确的凭据才能运行

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// 如果您已有 OAuth2 客户端 ID，请填写以下信息
const CLIENT_ID = '您的客户端ID';
const CLIENT_SECRET = '您的客户端密钥';
const REDIRECT_URI = 'http://localhost:3000/auth/callback';
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

// 创建 OAuth2 客户端
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
);

/**
 * 获取并存储访问令牌
 */
async function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });
  
  console.log('请在浏览器中访问以下 URL 进行授权:', authUrl);
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  return new Promise((resolve) => {
    rl.question('请输入授权码: ', async (code) => {
      rl.close();
      
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        
        // 保存凭据到本地文件（实际应用中应安全存储）
        fs.writeFileSync('gmail-token.json', JSON.stringify(tokens));
        console.log('凭据已保存到 gmail-token.json');
        
        resolve(oAuth2Client);
      } catch (err) {
        console.error('获取访问令牌出错:', err);
        resolve(null);
      }
    });
  });
}

/**
 * 列出用户的未读邮件
 */
async function listUnreadEmails(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  
  try {
    // 获取未读邮件列表
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread',
      maxResults: 10,
    });
    
    const messages = res.data.messages;
    
    if (!messages || messages.length === 0) {
      console.log('没有未读邮件');
      return;
    }
    
    console.log(`找到 ${messages.length} 封未读邮件:`);
    
    // 获取每封邮件的详细信息
    for (const message of messages) {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'metadata',
        metadataHeaders: ['Subject', 'From'],
      });
      
      const headers = email.data.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || '(无主题)';
      const from = headers.find(h => h.name === 'From')?.value || '(未知发件人)';
      
      console.log(`- 邮件: "${subject}" 来自: ${from}`);
    }
  } catch (error) {
    console.error('获取邮件列表出错:', error);
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    let auth = null;
    
    // 检查是否已有存储的令牌
    try {
      if (fs.existsSync('gmail-token.json')) {
        const content = fs.readFileSync('gmail-token.json');
        const tokens = JSON.parse(content);
        oAuth2Client.setCredentials(tokens);
        auth = oAuth2Client;
        console.log('已加载存储的凭据');
      }
    } catch (err) {
      console.log('未找到有效的存储凭据');
    }
    
    // 如果没有有效的凭据，获取新的
    if (!auth) {
      auth = await getAccessToken();
      if (!auth) {
        console.log('授权失败，无法继续');
        return;
      }
    }
    
    // 列出未读邮件
    await listUnreadEmails(auth);
    
  } catch (error) {
    console.error('执行测试脚本时出错:', error);
  }
}

// 运行主函数
console.log('开始测试 Gmail API 连接...');
main(); 