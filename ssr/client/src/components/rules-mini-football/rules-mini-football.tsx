import * as React from "react";
import './rules-mini-football.scss'
class RulesMiniFootball extends React.Component {
    componentDidMount() {
        RulesMiniFootball.setMeta();
    }
    render() {
        return (
            <div className="mini-football">
               <a href="https://www.thefa.com/-/media/cfa/derbyshirefa/files/mini-soccer-youth-futsal-handbook.ashx?la=en">Оригинал правил thefa</a>
               <p>
                   Футзал впервые начпли играть на баскетбольных полях Уругвая в 1930х.
                   Довольно скоро, эта версия футбола распространилась в остальные страны Южной Америки.
                   Футзал стал особенно популярным в густонаселенных городах, где имел место недостаток полей для футбола.
                   Навыки и техника развитая футзалом оказала влиянием на стиль игры бразильских команд.
                   И внесли свой вклад в победы этих команд на чемпионатах мира.
               </p>
                <div className="img-wrapper">
                    <img src="https://elasticbeanstalk-eu-north-1-242064348210.s3.eu-north-1.amazonaws.com/football/Снимок+экрана+2021-03-25+в+21.29.45.png" alt="Футзал в уругвае"/>
                </div>
                <p>Сейчас, футзал не просто инструмент для тренировки футболистов но по праву считается интересной игрой, сам по себе </p>
            </div>
        )
    }
    static setMeta() {
        document.title = 'Правила игры в мини футболл';
    }
}

export default RulesMiniFootball