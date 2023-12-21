
import { useEffect, useState } from 'react';    

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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>GS</th>
                        <th>GP</th>
                        <th>W</th>
                        <th>L</th>
                        <th>K</th>
                        <th>D</th>
                    </tr>
                </thead>
                <tbody>
                    {dataArray.map((row)=> (
                        <tr key={row.Rank}>
                            <td>{row.Rank}</td>
                            <td>{row.username}</td>
                            <td>{row.GameScore}</td>
                            <td>{row.wins + row.losses}</td>
                            <td>{row.wins}</td>
                            <td>{row.losses}</td>
                            <td>{row.kills}</td>
                            <td>{row.deaths}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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