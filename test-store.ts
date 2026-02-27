import { MOCK_ZONES } from "./lib/dummyData";

const layer = MOCK_ZONES[0].parkingStructure[0];
console.log(layer.name, layer.slots[0].layer, layer.slots[0].id);
