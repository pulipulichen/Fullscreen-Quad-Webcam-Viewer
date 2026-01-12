const http = require('http');
const { exec } = require('child_process');

const port = 28080;

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  let command = '';
  let actionName = '';

  if (req.url === '/shutdown') {
    actionName = 'sudo poweroff';
    command = 'sudo poweroff';
  } else if (req.url === '/reboot') {
    actionName = 'sudo reboot';
    command = 'sudo reboot';
  } else if (req.url === '/reset') {
    actionName = 'Restart Firefox';
    // 關閉 firefox 並重新開啟。使用 & 讓它在背景執行，避免阻塞回應。
    // 使用 pkill 確保所有 firefox 實例都被關閉。
    command = 'pkill firefox; firefox --kiosk http://localhost:18080/ &';
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found. Use /shutdown, /reboot, or /reset');
    return;
  }

  console.log(`Received GET request for ${req.url}. Executing: ${command}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    // Note: stderr doesn't always mean failure, but we log it.
    if (stderr) {
      console.warn(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  });

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('true');
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Endpoints:`);
  console.log(`  http://localhost:${port}/shutdown -> sudo poweroff`);
  console.log(`  http://localhost:${port}/reboot   -> sudo reboot`);
  console.log(`  http://localhost:${port}/reset    -> Restart Firefox`);
  console.warn('WARNING: sudo commands may prompt for a password if not configured in sudoers.');
});
