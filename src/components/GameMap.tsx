/* global document */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import renderer from "~/renderer";
import { HotkeyGroup, useControl } from "~components/HotkeysProvider";
import { DIRECTIONS } from "~constants";
import { useInterval } from "~hooks";
import { arePositionsEqual } from "~lib/geometry";
import actions from "~state/actions";
import selectors from "~state/selectors";
import { Pos } from "~types";
import { ControlCode } from "~types/ControlCode";

export default function GameMap() {
  useEffect(() => {
    const map = document.getElementById("map");
    if (map) {
      renderer.appendView(map);
    }
  }, []);

  const dispatch = useDispatch();
  const cursorPos = useSelector(selectors.cursorPos);
  const mousePosRef = useRef<Pos | null>(null);

  useControl({
    code: ControlCode.Back,
    group: HotkeyGroup.Main,
    callback: () => {
      if (cursorPos) dispatch(actions.setCursorPos(null));
    },
  });

  DIRECTIONS.forEach((d) =>
    useControl({
      code: d as ControlCode,
      group: HotkeyGroup.Main,
      shift: true,
      callback: () => dispatch(actions.moveCursor(d)),
    }),
  );
  // const performDefaultAction = (pos: Pos | null) => {
  //   const quickAction = getQuickAction(state, pos);
  //   if (quickAction) {
  //     dispatch(quickAction.action);
  //   }
  // };
  // useControl({
  //   code: ControlCode.QuickAction,
  //   group: HotkeyGroup.Main,
  //   callback: () => performDefaultAction(cursorPos),
  // });

  const onMouseMoveOrEnter = (e: React.MouseEvent) => {
    const mousePos = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    mousePosRef.current = mousePos;
    const pos = renderer.getPosFromMouse(mousePos.x, mousePos.y);
    if (!cursorPos || !arePositionsEqual(cursorPos, pos)) {
      dispatch(actions.setCursorPos(pos));
    }
  };

  useControl({
    code: ControlCode.ZoomIn,
    group: HotkeyGroup.Main,
    callback: () => renderer.zoomIn(),
  });
  useControl({
    code: ControlCode.ZoomOut,
    group: HotkeyGroup.Main,
    callback: () => renderer.zoomOut(),
  });

  useEffect(() => renderer.zoomIn(), []);
  useInterval(() => {
    renderer.setDimensions(
      document.body.clientWidth - 256,
      document.body.clientHeight,
    );
  }, 500);

  return (
    <section className="relative w-full h-full">
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        className="w-full h-full"
        id="map"
        onMouseMove={onMouseMoveOrEnter}
        onMouseEnter={onMouseMoveOrEnter}
        onMouseOut={() => {
          mousePosRef.current = null;
          if (cursorPos) {
            dispatch(actions.setCursorPos(null));
          }
        }}
        onWheel={(e) => {
          if (e.nativeEvent.deltaY > 0) {
            renderer.zoomOut();
          } else if (e.nativeEvent.deltaY < 0) {
            renderer.zoomIn();
          }
          if (mousePosRef.current) {
            const gamePos = renderer.getPosFromMouse(
              mousePosRef.current.x,
              mousePosRef.current.y,
            );
            if (!cursorPos || !arePositionsEqual(cursorPos, gamePos)) {
              dispatch(actions.setCursorPos(gamePos));
            }
          }
        }}
        onClick={(e) => {
          const mousePos = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
          };
          mousePosRef.current = mousePos;
          const gamePos = renderer.getPosFromMouse(mousePos.x, mousePos.y);
          if (!cursorPos || !arePositionsEqual(cursorPos, gamePos)) {
            dispatch(actions.setCursorPos(gamePos));
          }
          dispatch(actions.toggleWall(gamePos));
        }}
      />
    </section>
  );
}
