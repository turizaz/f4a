import React from 'react'
import './game-info.scss'
import {withNamespaces} from "react-i18next";

function GameInfo(props: any) {
    const {game, t} = props
    return (
            <div className="game-info">
                <div>
                    <div>{t('Город')}</div>
                    <div>{game.city}</div>
                </div>
                <div>
                    <div>Район</div>
                    <div>{game.district}</div>
                </div>
                <div>
                    <div>{t('Адрес')}</div>
                    <div>{game.address}</div>
                </div>
                <div>
                    <div>{t('Игроков')}</div>
                    <div>{game.players} ({game.active_players})</div>
                </div>
                {game.additional &&
                <div>
                    <div>{t('Дополнительно')}</div>
                    <div>{game.additional}</div>
                </div>
                }
            </div>)
}

export default withNamespaces()(GameInfo)
