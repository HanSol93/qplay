import Login from "./pages/Login";
import RoomList from "./pages/RoomList";
import Room from "./pages/Room";

const routes = {
  "/": Login,
  "/room-list": RoomList,
  "/room/:id": Room,
};

export default routes;
