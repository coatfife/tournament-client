
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';

let url = "https://tournament-server-s7j2.onrender.com/api/users"


export function Leaderboard() {

    let [dataArray, setDataArray] = useState([])

    useEffect(() => {
        axios.get(url)
        .then(function(response) {
            console.log(response)
            setDataArray(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }, [setDataArray])

    gameScore(dataArray)
    sortData(dataArray)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>GS</TableCell>
                        <TableCell>GP</TableCell>
                        <TableCell>W</TableCell>
                        <TableCell>L</TableCell>
                        <TableCell>K</TableCell>
                        <TableCell>D</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataArray.map((row)=> (
                        <TableRow key={row.Rank}>
                            <TableCell>{row.Rank}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.GameScore}</TableCell>
                            <TableCell>{row.wins + row.losses}</TableCell>
                            <TableCell>{row.wins}</TableCell>
                            <TableCell>{row.losses}</TableCell>
                            <TableCell>{row.kills}</TableCell>
                            <TableCell>{row.deaths}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function gameScore(dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
        const wins = dataArray[i].wins
        const kills = dataArray[i].kills
        const deaths = dataArray[i].deaths
        if (kills + deaths === 0) {
            dataArray[i].GameScore = 0
        } else {
            dataArray[i].GameScore = Math.round((Math.round(wins) + kills / (kills + deaths))*100)/100
        }
    }
}

function sortData(dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
        let highest = i
        for (let j = i; j < dataArray.length; j++) {
            if (dataArray[j].GameScore > dataArray[highest].GameScore) {
                highest = j
            }
        }
        let temp = dataArray[highest]
        dataArray[highest] = dataArray[i]
        dataArray[i] = temp
        dataArray[i].Rank = i+1
    }
}