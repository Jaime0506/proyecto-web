import React from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { MissionType } from "../../../../types/redux";

interface TableMissionsProps {
  missions: MissionType[];
  openModal: (mission: MissionType) => void;
}

export const TableMissions: React.FC<TableMissionsProps> = ({ missions, openModal }) => {
  return (
    <Table
      color="primary"
      aria-label="table with list of missions"
      selectionMode="single"
      onSelectionChange={(selectedKeys) => {
        const selectedMission = missions.find((mission) => mission.id === Array.from(selectedKeys)[0]);
        if (selectedMission) openModal(selectedMission);
      }}
    >
      <TableHeader>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Descripción</TableColumn>
        <TableColumn>Puntos</TableColumn>
      </TableHeader>
      <TableBody>
        {missions.map((mission) => (
          <TableRow key={mission.id}>
            <TableCell>{mission.name}</TableCell>
            <TableCell>{mission.description}</TableCell>
            <TableCell>{mission.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
