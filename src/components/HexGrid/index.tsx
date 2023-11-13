import { useEffect, useRef, useState } from "react";
import { territoryMap } from "../../types/maps/territory_map";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { playersMap } from "../../types/maps/players_map";
import { socket } from "../../sockets/socket";
import { axialCoordinates, ICardParams } from "../../types/types";
import { AppDispatch } from "../../redux/store";
import { setCardPlay } from "../../redux/slices/CardPlaySlice";
import { fetchHexagons } from "../../redux/slices/hexagonsSlice";
import { fetchSidebarInfo } from "../../redux/slices/SideBarSlice";

export const HexGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const MapInfo = useSelector((state: RootState) => state.hexagons);
  const SideBarInfo = useSelector((state: RootState) => state.sideBar);
  const CardInfo = useSelector((state: RootState) => state.cards);
  const { isCardPlay, card } = useSelector(
    (state: RootState) => state.cardPlay
  );
  const dispatch: AppDispatch = useDispatch();
  const [axial, setAxial] = useState<axialCoordinates | axialCoordinates[]>({
    q: 0,
    r: 0,
  });

  useEffect(() => {
    console.log("useEffect called");
    // console.log(CardInfo);

    // console.log(isCardPlay);

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
      const territory = territoryMap?.get(field.territoryId);
      const player1_clans = field.playerClans[SideBarInfo.players[0].id];
      const player2_clans = field.playerClans[SideBarInfo.players[1].id];
      const player3_clans = field.playerClans[SideBarInfo.players[2].id];

      if (!territory) {
        return;
      }

      const a = (2 * Math.PI) / 6;
      let x = canvas.width / 2 + rad * (3 / 2) * r;
      let y = canvas.height / 2 + rad * Math.sqrt(3) * (q + r / 2);
      ctx.fillStyle = territory?.field_color;

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
      if (player1_clans && player1_clans > 0) {
        Add_Clans(ctx, x - 120, y + 20, "blue", player1_clans);
      }
      if (player2_clans > 0) {
        Add_Clans(ctx, x - 45, y + 20, "red", player2_clans);
      }
      if (player3_clans > 0) {
        Add_Clans(ctx, x + 30, y + 20, "purple", player3_clans);
      }
    });
    console.log(isCardPlay);
    if (
      isCardPlay &&
      Array.isArray(CardInfo.axial) &&
      CardInfo.axial.length > 0 &&
      CardInfo.axial[0] !== undefined
    ) {
      const a = (2 * Math.PI) / 6;
      for (let i = 0; i < CardInfo.axial.length; i++) {
        let x = canvas.width / 2 + rad * (3 / 2) * CardInfo.axial[i].r;
        let y =
          canvas.height / 2 +
          rad * Math.sqrt(3) * (CardInfo.axial[i].q + CardInfo.axial[i].r / 2);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "transparent";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
      }

      const handleCanvasClick = (event: MouseEvent) => {
        var mouseX = event.clientX - canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - canvas.getBoundingClientRect().top;

        if (
          isCardPlay &&
          Array.isArray(CardInfo.axial) &&
          CardInfo.axial.length > 0 &&
          CardInfo.axial[0] !== undefined
        ) {
          for (let i = 0; i < CardInfo.axial.length; i++) {
            let x = canvas.width / 2 + rad * (3 / 2) * CardInfo.axial[i].r;
            let y =
              canvas.height / 2 +
              rad *
                Math.sqrt(3) *
                (CardInfo.axial[i].q + CardInfo.axial[i].r / 2);

            var distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
            if (distance <= 20) {
              if (Array.isArray(CardInfo.axial) && card) {
                socket.emit("player-card-season", {
                  cardId: card.id,
                  params: {
                    axial: CardInfo.axial[i],
                  },
                });
              }
              dispatch(fetchHexagons());
              dispatch(fetchSidebarInfo());
              dispatch(setCardPlay({ isCardPlay: false, card: null }));
              break; // Exit the loop once a circle is clicked
            }
          }
        }
      };

      // Add the event listener outside the loop
      canvas.addEventListener("click", handleCanvasClick);

      // Cleanup function
      return () => {
        canvas.removeEventListener("click", handleCanvasClick);
      };
    }
  }, [MapInfo, isCardPlay, CardInfo]);

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
