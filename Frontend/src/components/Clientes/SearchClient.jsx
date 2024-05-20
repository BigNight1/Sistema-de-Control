import React from "react";
import { useClient } from "../../context/ClientContext";
import { Button, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {Link} from "react-router-dom"

const SearchCliente = () => {
  const { searchTerms, setSearchTerms } = useClient();
  return (
    <div className="mx-2 flex justify-between">
      <Link to="/welcome"><Button variant="filled">Volver</Button></Link>
      <div className="flex justify-between">
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
