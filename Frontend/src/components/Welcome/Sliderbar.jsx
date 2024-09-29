import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import Client_icon from "../../Icons/Client-icon.jsx";

const Sliderbar = () => {
  return (
    <div className="flex">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 flex items-center gap-4 p-4">
          <img
            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
            alt="brand"
            className="h-8 w-8"
          />
          <Typography variant="h5" color="blue-gray">
            ArmalyCell
          </Typography>
        </div>
        <List>
          <Link to="/Dashboard">
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>

          <Link to="/clientes">
            <ListItem>
              <ListItemPrefix>
                <Client_icon className="h-5 w-5" />
              </ListItemPrefix>
              Clientes
            </ListItem>
          </Link>
          <Link to="/registro">
            <ListItem>
              <ListItemPrefix>
                <Client_icon className="h-5 w-5" />
              </ListItemPrefix>
              Registro
            </ListItem>
          </Link>

         
          <hr className="my-2 border-blue-gray-50" />

          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default Sliderbar;
