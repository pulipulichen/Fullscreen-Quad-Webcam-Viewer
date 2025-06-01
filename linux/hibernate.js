const http = require('http');
const { exec } = require('child_process');

const port = 28080;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('Received GET request. Executing sudo systemctl hibernate...');
    exec('sudo systemctl hibernate', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Command stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Command executed successfully: ${stdout}`);
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Access http://localhost:${port} to trigger 'sudo systemctl hibernate'`);
  console.warn('WARNING: Executing "sudo systemctl hibernate" requires sudo privileges and may prompt for a password.');
  console.warn('Ensure this script is run in an environment where sudo commands can be executed, or configure sudoers for passwordless execution for this specific command.');
});
