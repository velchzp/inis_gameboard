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
  const MapInfo = useSelector((state: RootState) => state.hexagons);
  const LobbyInfo = useSelector((state: RootState) => state.lobbyInfo);

  useEffect(() => {
    dispatch(fetchHexagons());
    console.log(MapInfo);
    console.log(LobbyInfo);

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
    MapInfo.hexGrid.forEach((hexagon) => {
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
      ctx.fillStyle = "black";
      ctx.font = "19px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(territory.title, x, y - 150);
      if (
        MapInfo.holiday?.q === hexagon.q &&
        MapInfo.holiday?.r === hexagon.r
      ) {
        Add_img(ctx, "/holiday_token.png", x, y, 35, 90);
      }
      if (
        MapInfo.capital?.q === hexagon.q &&
        MapInfo.capital?.r === hexagon.r
      ) {
        Add_img(ctx, "/capital.png", x, y, 140, -110);
      }
      if (hexagon.field.citadelsCount > 0) {
        ctx.font = "19px Arial";
        ctx.fillText(hexagon.field.citadelsCount.toString(), x + 15, y - 100);
        Add_img(ctx, "/castle 1.png", x, y, 40, -110);
      }
      if (hexagon.field.sanctuaryCount > 0) {
        ctx.font = "19px Arial";
        ctx.fillText(hexagon.field.sanctuaryCount.toString(), x + 105, y - 100);
        Add_img(ctx, "/chapel 1.png", x, y, -50, -110);
      }
    });
  }, [dispatch, MapInfo]);

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

  function Add_img(
    ctx: CanvasRenderingContext2D,
    scr: string,
    x: number,
    y: number,
    cor_x: number,
    cor_y: number
  ) {
    const img = new Image();
    img.src = process.env.PUBLIC_URL + scr;

    img.onload = function () {
      ctx.drawImage(img, x - cor_x, y + cor_y, 70, 70);
    };
  }

  function Add_Clans(
    ctx: CanvasRenderingContext2D,
    triangle_X: number,
    triangle_Y: number,
    color: string,
    player_clans: number
  ) {
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
    ctx.fillText(player_clans.toString(), triangle_X, triangle_Y + 12);
  }

  return (
    <div className="App">
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </div>
  );
};
