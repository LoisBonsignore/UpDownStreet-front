import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import './Selector.css'


const region = [
  { value: "all", label: "Toutes les régions" },
  { value: "Auvergne-Rhône-Alpes", label: "Auvergne-Rhône-Alpes" },
  { value: "Bourgogne-Franche-Comté", label: "Bourgogne-Franche-Comté" },
  { value: "Bretagne", label: "Bretagne" },
  { value: "Centre-Val de Loire", label: "Centre-Val de Loire" },
  { value: "Corse", label: "Corse" },
  { value: "Grand Est", label: "Grand Est" },
  { value: "Hauts-de-France", label: "Hauts-de-France" },
  { value: "Ile-de-France", label: "Ile-de-France" },
  { value: "Normandie", label: "Normandie" },
  { value: "Nouvelle-Aquitaine", label: "Nouvelle-Aquitaine" },
  { value: "Occitanie", label: "Occitanie" },
  { value: "Pays de la Loire", label: "Pays de la Loire" },
  { value: "Provence-Alpes-Côte d'Azur", label: "Provence-Alpes-Côte d'Azur" },
];

const bedrooms = [
  {value: "all", label: "Tous les biens"},
  {value: 1, label: "1"},
  {value: 2, label: "2"},
  {value: 3, label: "3"},
  {value: 4, label: "4"},
  {value: 5, label: "5"},
  {value: 6, label: "6"},
  {value: 7, label: "7+"}
]

function Selector({filterRegion, setFilterRegion, filterBedrooms, setFilterBedrooms}) {

  
  function handleRegion(e) {
    setFilterRegion(e.value);
  }
  
   function handleBedrooms(e) {
    setFilterBedrooms(e.value);
  } 

  return (
    <div className="selector-selecteur">
      <div>
        <label>Choisissez une région:</label>
        <Select options={region}
        placeholder="Choisissez une région"
        value={region.find(obj => obj.value === filterRegion)}
        onChange={handleRegion}
        isSearchable
        />
      </div>
      <div>
        <label>Choisissez un nombre de chambre:</label>
        <Select options={bedrooms}
        placeholder="Choisissez par nombre de chambres"
        value={bedrooms.find(obj => obj.value === filterBedrooms)}
        onChange={(e) => handleBedrooms(e)}
        isSearchable
        />
       
      </div>
    </div>
  );
}

export default Selector;
