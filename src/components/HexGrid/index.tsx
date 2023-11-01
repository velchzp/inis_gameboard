import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../sockets/socket";
import { IMapUiInfo, axialCoordinates, Field } from "../../types/types";
import { territoryMap } from "../../types/maps/territory_map";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchHexagons } from "../../redux/slices/hexagonsSlice";

export const HexGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const hexagons = useSelector((state: RootState) => state.hexagons.hexagons);

  useEffect(() => {
    dispatch(fetchHexagons());
    console.log(hexagons);
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
    hexagons.forEach((hexagon) => {
      const { q, r, field } = hexagon;
      const territory = territoryMap.get(field.territoryId);
      if (!territory) {
        return;
      }
      const a = (2 * Math.PI) / 6;
      let x = canvas.width / 2 + rad * (3 / 2) * r;
      let y = canvas.height / 2 + rad * Math.sqrt(3) * (q + r / 2);
      ctx.fillStyle = territory.field_color;

      ctx.beginPath();
      for (var i = 0; i < 6; i++) {
        ctx.lineTo(x + rad * Math.cos(a * i), y + rad * Math.sin(a * i));
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "black";

      ctx.stroke();
    });
  }, [dispatch, hexagons]);

  // ctx.fillStyle = "black";
  // ctx.font = "19px Arial";
  // ctx.textAlign = "center";
  // ctx.textBaseline = "middle";
  // ctx.fillText(landName, x, y - 150);

  // if (holiday) {
  //   Add_img(ctx, "/holiday_token.png", x, y, 35, 90);
  // }

  // if (castle > 0) {
  //   ctx.font = "19px Arial";
  //   ctx.fillText(castle, x + 15, y - 100);
  //   Add_img(ctx, "/castle 1.png", x, y, 40, -110);
  // }
  // if (chapel > 0) {
  //   ctx.font = "19px Arial";
  //   ctx.fillText(chapel, x + 105, y - 100);
  //   Add_img(ctx, "/chapel 1.png", x, y, -50, -110);
  // }
  // if (capital > 0) {
  //   Add_img(ctx, "/capital.png", x, y, 140, -110);
  // }
  // if (player1_clans > 0) {
  //   Add_Clans(ctx, x - 120, y + 20, "blue", player1_clans);
  // }
  // if (player2_clans > 0) {
  //   Add_Clans(ctx, x - 45, y + 20, "red", player2_clans);
  // }
  // if (player3_clans > 0) {
  //   Add_Clans(ctx, x + 30, y + 20, "purple", player3_clans);
  // }
  // if (player4_clans > 0) {
  //   Add_Clans(ctx, x + 110, y + 20, "black", player4_clans);
  // }

  // function Add_img(ctx, scr, x, y, cor_x, cor_y) {
  //   const img = new Image();
  //   img.src = process.env.PUBLIC_URL + scr;

  //   img.onload = function () {
  //     ctx.drawImage(img, x - cor_x, y + cor_y, 70, 70);
  //   };
  // }

  // function Add_Clans(ctx, triangle_X, triangle_Y, color, player_clans) {
  //   const trianglePoints = [
  //     { x: triangle_X, y: triangle_Y - 20 },
  //     { x: triangle_X - 30, y: triangle_Y + 30 },
  //     { x: triangle_X + 30, y: triangle_Y + 30 },
  //   ];
  //   ctx.beginPath();
  //   ctx.moveTo(trianglePoints[0].x, trianglePoints[0].y);
  //   for (let i = 1; i < trianglePoints.length; i++) {
  //     ctx.lineTo(trianglePoints[i].x, trianglePoints[i].y);
  //   }
  //   ctx.closePath();
  //   ctx.fillStyle = color;
  //   ctx.fill();
  //   ctx.font = "23px Arial";
  //   ctx.fillStyle = "white";
  //   ctx.fillText(player_clans, triangle_X, triangle_Y + 12);
  // }

  return (
    <div className="App">
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </div>
  );
};
