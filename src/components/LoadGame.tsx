import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { load } from "~lib/gameSave";
import renderer from "~renderer";
import actions from "~state/actions";

export default function LoadGame() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    renderer
      .getLoadPromise()
      .then(load)
      .then((savedGame) => {
        if (!savedGame) {
          setIsLoading(false);
          dispatch(actions.newGame());
        } else {
          setIsLoading(false);
          dispatch(actions.loadGame({ state: savedGame }));
        }
      });
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed w-screen h-screen bg-darkestGray z-20 text-center text-2xl pt-20">
      Loading...
    </div>
  );
}
