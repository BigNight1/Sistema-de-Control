import React from "react";
import { useClient } from "../../context/ClientContext";
import { Button, Input, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {Link} from "react-router-dom"
import Create_icon from "../../Icons/Create-icon";

const SearchCliente = () => {
  const { searchTerms, setSearchTerms } = useClient();
  return (
    <div className="mx-2 flex justify-between	">
      <Link to="/clientes/create-client">
            <ListItem >
              <ListItemPrefix className="mr-2">
                <Create_icon className="h-5 w-5" />
              </ListItemPrefix>
              Crear
            </ListItem>
          </Link>
      <div className="flex">
        <Input
          type="text"
          icon={<MagnifyingGlassIcon />}
          label="Search"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchCliente;
