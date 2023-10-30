import React, { useEffect, useRef, useState } from "react";

export const HexGrid = () => {
  const canvasRef = useRef(null);
  const [hexagons, setHexagons] = useState([
    {
      cor_1: 0,
      cor_2: 0,
      fillColor: "#45CE53",
      borderColor: "black",
      landName: "Land 1",
      holiday: true,
      castle: 2,
      chapel: 3,
      capital: true,
      player1_clans: 7,
      player2_clans: 2,
      player3_clans: 1,
      player4_clans: 1,
    },
    {
      cor_1: 1,
      cor_2: 0,
      fillColor: "#07B898",
      borderColor: "black",
      landName: "Land 2",
      holiday: false,
      castle: 2,
      chapel: 3,
      capital: false,
      player1_clans: 1,
      player2_clans: 2,
      player3_clans: 0,
      player4_clans: 0,
    },
    {
      cor_1: 0,
      cor_2: 1,
      fillColor: "#D4E13A",
      borderColor: "black",
      landName: "Land 3",
      holiday: false,
      castle: 2,
      chapel: 3,
      capital: false,
      player1_clans: 0,
      player2_clans: 0,
      player3_clans: 1,
      player4_clans: 3,
    },
  ]);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 7000;
    canvas.height = 7000;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const r = 200;

    hexagons.forEach((hexagon) => {
      const {
        cor_1,
        cor_2,
        fillColor,
        borderColor,
        landName,
        holiday,
        castle,
        chapel,
        capital,
        player1_clans,
        player2_clans,
        player3_clans,
        player4_clans,
      } = hexagon;
      const a = (2 * Math.PI) / 6;
      let x = canvas.width / 2 + r * (3 / 2) * cor_1;
      let y = canvas.height / 2 + r * Math.sqrt(3) * (cor_2 + cor_1 / 2);
      ctx.fillStyle = fillColor;

      ctx.beginPath();
      for (var i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = borderColor;

      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.font = "19px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(landName, x, y - 150);

      if (holiday) {
        Add_img(ctx, "/holiday_token.png", x, y, 35, 90);
      }

      if (castle > 0) {
        ctx.font = "19px Arial";
        ctx.fillText(castle, x + 15, y - 100);
        Add_img(ctx, "/castle 1.png", x, y, 40, -110);
      }
      if (chapel > 0) {
        ctx.font = "19px Arial";
        ctx.fillText(chapel, x + 105, y - 100);
        Add_img(ctx, "/chapel 1.png", x, y, -50, -110);
      }
      if (capital > 0) {
        Add_img(ctx, "/capital.png", x, y, 140, -110);
      }
      if (player1_clans > 0) {
        Add_Clans(ctx, x - 120, y + 20, "blue", player1_clans);
      }
      if (player2_clans > 0) {
        Add_Clans(ctx, x - 45, y + 20, "red", player2_clans);
      }
      if (player3_clans > 0) {
        Add_Clans(ctx, x + 30, y + 20, "purple", player3_clans);
      }
      if (player4_clans > 0) {
        Add_Clans(ctx, x + 110, y + 20, "black", player4_clans);
      }
    });
  }, [hexagons]);

  function Add_img(ctx, scr, x, y, cor_x, cor_y) {
    const img = new Image();
    img.src = process.env.PUBLIC_URL + scr;

    img.onload = function () {
      ctx.drawImage(img, x - cor_x, y + cor_y, 70, 70);
    };
  }

  function Add_Clans(ctx, triangle_X, triangle_Y, color, player_clans) {
    const trianglePoints = [
      { x: triangle_X, y: triangle_Y - 20 },
      { x: triangle_X - 30, y: triangle_Y + 30 },
      { x: triangle_X + 30, y: triangle_Y + 30 },
    ];
    ctx.beginPath();
    ctx.moveTo(trianglePoints[0].x, trianglePoints[0].y);
    for (let i = 1; i < trianglePoints.length; i++) {
      ctx.lineTo(trianglePoints[i].x, trianglePoints[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.font = "23px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(player_clans, triangle_X, triangle_Y + 12);
  }

  return (
    <div className="App">
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </div>
  );
};
