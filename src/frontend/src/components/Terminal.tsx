import React, { useState, useRef } from 'react';

const Terminal = () => {
  const [output, setOutput] = useState<string[]>(['Welcome to the terminal!']);
  const [input, setInput] = useState<string>('C:\> ');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const command = input.trim().split(' ')[1].toLowerCase();

      switch (command) {
        case 'help':
          setOutput((prevOutput) => [
            ...prevOutput, input,
            'Available commands:\n- help: Show this help message\n- hello: Greet the user\n- ktkrvc: Greet the Kiti',
          ]);
          break;
        case 'hello':
          setOutput((prevOutput) => [...prevOutput, input, 'Hello, User!']);
          break;
        case 'ktkrvc':
            setOutput((prevOutput) => [...prevOutput, input, 'Hello, Kiti!']);
            break;
        default:
          setOutput((prevOutput) => [...prevOutput, input, `Command not found: ${command}\n- Type 'help' for a list of available commands`]);
      }

      setInput('C:\> ');
    }
  };

  // Handle focus when the terminal is clicked
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
        cursor: 'text', // To indicate the user can click to focus
      }}
      onClick={handleTerminalClick}
    >
      <div style={{ whiteSpace: 'pre-wrap'}}>
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
};

export default Terminal;
