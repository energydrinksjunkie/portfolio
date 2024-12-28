import React, { useState, useRef, useImperativeHandle } from 'react';

// Define the props and ref types
export interface TerminalHandle {
  focusInput: () => void; // Expose a method to focus the input
}

const Terminal = React.forwardRef<TerminalHandle>((_, ref) => {
  const [output, setOutput] = useState<string[]>(['Welcome to the portfolio terminal!','Type "help" for a list of available commands']);
  const [input, setInput] = useState<string>('C:\\> ');
  const inputRef = useRef<HTMLInputElement>(null);
  const files = ['file1.txt', 'file2.txt', 'document.pdf']; // Files in current directory
  
  // Hashmap (object) for file contents
  const fileContents: Record<string, string> = {
    'file1.txt': 'This is the content of file1.txt. It contains some text.',
    'file2.txt': 'This is file2.txt. Here you have some more content.',
    'document.pdf': 'PDF content would be shown here, but it is simulated as text.',
  };

  // Expose methods to the parent through the ref
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus();
    },
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let command = '';
      let args = '';
      try {
        // Split command and arguments
        const [_,cmd, ...rest] = input.trim().split(' ');
        command = cmd.toLowerCase();
        args = rest.join(' ');

        switch (command) {
          case 'help':
            setOutput((prevOutput) => [
              ...prevOutput,
              input,
              'Available commands:\n- help: Show this help message\n- hello: Greet the user\n- ktkrvc: Greet the Kiti\n- clear: Clear the terminal\n- type <file>: Display the contents of a file\n- dir: List files in the current directory\n- whatsmyip: Show your public IP address',
            ]);
            break;
          case 'hello':
            setOutput((prevOutput) => [...prevOutput, input, 'Hello, User!']);
            break;
          case 'ktkrvc':
            setOutput((prevOutput) => [...prevOutput, input, 'Hello, Kiti!']);
            break;
          case 'clear':
            setOutput([]);
            break;
          case 'dir':
            setOutput((prevOutput) => [
              ...prevOutput,
              input,
              `${files.join('\n')}`,
            ]);
            break;
          case 'type':
            if (args && files.includes(args)) {
              // Check if the file exists in the hashmap
              const content = fileContents[args];
              if (content) {
                setOutput((prevOutput) => [
                  ...prevOutput,
                  input,
                  content,
                ]);
              } else {
                setOutput((prevOutput) => [
                  ...prevOutput,
                  input,
                  `Could not find content for file: ${args}`,
                ]);
              }
            } else {
              setOutput((prevOutput) => [
                ...prevOutput,
                input,
                `File not found: ${args}`,
              ]);
            }
            break;
            case 'whatsmyip':
            // Fetch public IP address from an external API
            fetch('https://api.ipify.org?format=json')
              .then((response) => response.json())
              .then((data) => {
                setOutput((prevOutput) => [
                  ...prevOutput,
                  input,
                  `Your public IP address is: ${data.ip}`,
                ]);
              })
              .catch(() => {
                setOutput((prevOutput) => [
                  ...prevOutput,
                  input,
                  'Could not retrieve IP address.',
                ]);
              });
            break;
          default:
            setOutput((prevOutput) => [
              ...prevOutput,
              input,
              `Command not found: ${command}\n- Type "help" for a list of available commands`,
            ]);
        }
      } catch (error) {
        setOutput((prevOutput) => [
          ...prevOutput,
          input,
          `Command not found: ${command}\n- Type "help" for a list of available commands`,
        ]);
      } finally {
        setInput('C:\> ');
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        overflow: 'auto',
        backgroundColor: 'black',
        color: 'white',
        padding: '10px',
        fontFamily: 'monospace',
        width: '640px',
        height: '480px',
        cursor: 'text',
      }}
      onClick={handleTerminalClick}
    >
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleCommand}
        style={{
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          width: '100%',
          outline: 'none',
        }}
        autoFocus
      />
    </div>
  );
});

export default Terminal;
