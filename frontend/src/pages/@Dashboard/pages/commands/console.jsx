import React, { useState, useEffect, useRef } from "react";
import DashboardNav from "../../../@Dashboard/nav";

const Commands = () => {
  const [commands, setCommands] = useState([]);
  const [customCommand, setCustomCommand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);
  const lastCommandRef = useRef(null);
  const commandRefs = useRef([]);

  useEffect(() => {
    const sampleHistory = [
      {
        text: "Capture Image",
        time: new Date().toLocaleTimeString(),
        type: "sent",
        status: "pending",
      },
      {
        text: "Adjust Orbit",
        time: new Date().toLocaleTimeString(),
        type: "sent",
        status: "pending",
      },
      {
        text: "Adjust Orbit",
        time: new Date().toLocaleTimeString(),
        type: "sent",
        status: "pending",
      },
      {
        text: "Activate Sensor",
        time: new Date().toLocaleTimeString(),
        type: "sent",
        status: "pending",
      },
      {
        text: "Deactivate Camera",
        time: new Date().toLocaleTimeString(),
        type: "sent",
        status: "pending",
      },
    ];
    setCommands(sampleHistory);
  }, []);

  const sendCommand = async (command) => {
    const newCommand = {
      text: command,
      time: new Date().toLocaleTimeString(),
      type: "sent",
      status: "pending",
    };

    setCommands((prevCommands) => [...prevCommands, newCommand]);

    // API call to send command
    try {
      const response = await fetch("https://agroxsat.onrender.com/backendapi/command/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command }), // Sending the command as JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Simulate updating command status after response
      setTimeout(() => {
        updateCommandStatus(newCommand.text, "success");
      }, 2000);
    } catch (error) {
      console.error("Error sending command:", error);
      // Update command status to indicate failure
      updateCommandStatus(newCommand.text, "error");
    }
  };

  const updateCommandStatus = (text, newStatus) => {
    setCommands((prevCommands) =>
      prevCommands.map((cmd) =>
        cmd.text === text ? { ...cmd, status: newStatus } : cmd
      )
    );
  };

  const handleCustomCommand = (e) => {
    e.preventDefault();
    if (customCommand.trim()) {
      sendCommand(customCommand);
      setCustomCommand("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newHighlightedIndices = commands
      .map((cmd, index) =>
        cmd.text.toLowerCase().includes(searchQuery.toLowerCase()) ? index : -1
      )
      .filter((index) => index !== -1)
      .reverse();

    setHighlightedIndices(newHighlightedIndices);
    setCurrentHighlightIndex(0);

    if (newHighlightedIndices.length > 0) {
      const indexToScroll = newHighlightedIndices[0];
      commandRefs.current[indexToScroll].scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNextHighlight = () => {
    if (highlightedIndices.length > 0) {
      const nextIndex = (currentHighlightIndex + 1) % highlightedIndices.length;
      setCurrentHighlightIndex(nextIndex);
      const indexToScroll = highlightedIndices[nextIndex];
      commandRefs.current[indexToScroll].scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (lastCommandRef.current) {
      lastCommandRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [commands]);

  return (
    <>
      <DashboardNav />
      <div className="pt-16 md:pt-10 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="max-w-lg w-full h-full bg-white rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Satellite Command Interface
            </h2>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b bg-gray-50">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search command"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black-olive text-white rounded-full hover:bg-olive"
              >
                Search
              </button>
            </form>
          </div>

          {/* Scrollable Chat History */}
          <div
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
            style={{ maxHeight: "400px" }}
          >
            <ul className="space-y-3">
              {commands.map((cmd, index) => (
                <li
                  key={index}
                  ref={(el) => (commandRefs.current[index] = el)}
                  className={`flex ${cmd.type === "sent" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                      cmd.type === "sent" ? "bg-black-olive text-white" : "bg-gray-200 text-gray-900"
                    } ${
                      highlightedIndices.includes(index) &&
                      currentHighlightIndex === highlightedIndices.indexOf(index)
                        ? "ring-4 ring-blue-300"
                        : ""
                    }`}
                  >
                    <div className="text-sm">{cmd.text}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-200 mt-1">{cmd.time}</div>
                      <div className="ml-2 text-xs text-gray-400">
                        {cmd.status === "pending" ? (
                          <span>✓</span>
                        ) : (
                          <span>✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              <div ref={lastCommandRef}></div>
            </ul>
          </div>

          {/* Highlight Next Button */}
          {highlightedIndices.length > 1 && (
            <div className="p-4 border-t bg-white">
              <button
                onClick={handleNextHighlight}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                Next Occurrence
              </button>
            </div>
          )}

          {/* Fixed Predefined Command Buttons */}
          <div className="p-4 flex flex-col space-y-3 bg-white border-t">
            <button
              onClick={() => sendCommand("Capture Image")}
              className="px-4 py-2 bg-black-olive text-white rounded-lg shadow-md hover:bg-olive w-full text-left"
            >
              <div className="flex justify-between">
                <span>Capture Image</span>
                <span className="text-xs text-gray-200">{new Date().toLocaleTimeString()}</span>
              </div>
            </button>
            <button
              onClick={() => sendCommand("Adjust Orbit")}
              className="px-4 py-2 bg-giants-orange text-white rounded-lg shadow-md w-full text-left"
            >
              <div className="flex justify-between">
                <span>Adjust Orbit</span>
                <span className="text-xs text-gray-200">{new Date().toLocaleTimeString()}</span>
              </div>
            </button>
          </div>

          {/* Fixed Input Area */}
          <div className="p-4 border-t bg-white">
            <form onSubmit={handleCustomCommand} className="flex space-x-2">
              <input
                type="text"
                value={customCommand}
                onChange={(e) => setCustomCommand(e.target.value)}
                placeholder="Enter command"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black-olive text-white rounded-full hover:bg-olive"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Commands;
