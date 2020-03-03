import React from 'react'
import './game-info.scss'
function GameInfo(props: any) {
    const {game} = props
    return (
            <div className="game-info">
                <div>
                    <div>Город</div>
                    <div>{game.city}</div>
                </div>
                <div>
                    <div>Район</div>
                    <div>{game.district}</div>
                </div>
                <div>
                    <div>Адресс</div>
                    <div>{game.address}</div>
                </div>
                <div>
                    <div>Игроков</div>
                    <div>{game.players} ({game.active_players})</div>
                </div>
                {game.additional &&
                <div>
                    <div>Доп инфо</div>
                    <div>{game.additional}</div>
                </div>
                }
            </div>)
}

export default GameInfo
