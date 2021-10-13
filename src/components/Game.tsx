/* global document */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import colors from "~colors";
import actions from "~state/actions";
import GameMap from "./GameMap";
import Header from "./Header";
import HotkeysProvider from "./HotkeysProvider";
import LoadGame from "./LoadGame";

export default function Game() {
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(colors).forEach(([color, value]) =>
      document.body.style.setProperty(`--${color}`, value),
    );
  }, []);

  return (
    <HotkeysProvider>
      <main className="h-full flex flex-col">
        <LoadGame />
        <div className="flex flex-row flex-1 w-full h-full">
          <div className="flex-none w-64 h-full flex flex-col border-r border-gray z-10">
            <Header />
            <div className="p-2">Click (and drag) to add wall.</div>
            <div className="p-2">Right-click (and drag) to remove.</div>
            <div className="p-2">Press R to reset.</div>
            <button
              className="btn"
              type="button"
              onClick={() => dispatch(actions.generateMap())}
            >
              Generate Random Map
            </button>
            <div className="p-2">
              <a
                href="https://github.com/mscottmoore/rects-in-hex-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue underline"
              >
                Source Code
              </a>
            </div>
          </div>
          <div className="flex-1 h-full w-full">
            <GameMap />
          </div>
        </div>
      </main>
    </HotkeysProvider>
  );
}
