import React from "react";
import { Card, axialCoordinates } from "../../types/types";
import { socket } from "../../sockets/socket";
import { useEffect, useState, useRef } from "react";
import { Typography, Box, Stack } from "@mui/material";

export const CardPlay = () => {
  const [axial, setAxial] = useState<axialCoordinates | axialCoordinates[]>({
    q: 0,
    r: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.width = 7000;
    canvas.height = 7000;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rad = 200;
    const a = (2 * Math.PI) / 6;
    let x = canvas.width / 2 + rad * (3 / 2) * 0;
    let y = canvas.height / 2 + rad * Math.sqrt(3) * (0 + 0 / 2);
    ctx.fillStyle = "red";

    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      ctx.lineTo(x + rad * Math.cos(a * i), y + rad * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "black";
  });

  return (
    <div
      className="ass"
      style={{ border: "1px solid black", position: "absolute" }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

// console.log(card);
//                   socket.emit("player-card-info", {
//                     cardId: card.id,
//                   });
//                   socket.on("player-card-info", (data) => {
//                     setAxial(data.axial);
//                   });
//                   console.log(axial);
// if (Array.isArray(axial)) {
//   socket.emit("player-card-season", {
//     cardId: card.id,
//     params: {
//       axial: axial[0],
//     },
//   });
//                     dispatch(fetchHexagons());
//                     dispatch(fetchSidebarInfo());
//                     return;
