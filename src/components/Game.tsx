/* global document */
import React, { useEffect } from "react";
import colors from "~colors";
import GameMap from "./GameMap";
import Header from "./Header";
import HotkeysProvider from "./HotkeysProvider";
import LoadGame from "./LoadGame";

export default function Game() {
  useEffect(() => {
    Object.entries(colors).forEach(([color, value]) =>
      document.body.style.setProperty(`--${color}`, value),
    );
  }, []);

  return (
    <HotkeysProvider>
      <main className="h-full flex flex-col">
        <LoadGame />
        <div
          className="flex flex-row flex-1 w-full"
          style={{ height: "calc(100% - 275px)" }}
        >
          <div className="flex-none w-64 h-full flex flex-col border-r border-gray z-10">
            <Header />
            <div className="p-2">Click to toggle wall.</div>
            <div className="p-2">Press R to reset.</div>
          </div>
          <div className="flex-1 h-full w-full">
            <GameMap />
          </div>
        </div>
      </main>
    </HotkeysProvider>
  );
}
