const { spawn } = require('child_process');

it('runs successfully with following: -c "C1-R0-A"', () => {
    const args = ['index.js', '-c', 'C1-R0-A', '-i', './input.txt']
    const process = spawn('node', args);

    let result = [];

    process.stdout.on('data', chunk => result.push(String(chunk)))
  
    process.stdout.on('end', () => {
        expect(result.join(' '))
            .toEqual('Nzyo yo ocepcn. Ucoogac gfsmn "_" oiufsv!\n');
    });
});