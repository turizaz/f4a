import * as React from 'react';
import './quotes.scss';
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
class Quote {
    author: string;
    text: string;
    img: string;
    constructor(author, text, img) {
        this.author = author;
        this.text = text;
        this.img = img;
    }
}
export default class Quotes extends React.Component {
    img = {
        kroif: "https://elasticbeanstalk-eu-north-1-242064348210.s3.eu-north-1.amazonaws.com/football/419+(1).jpg"
    }
    public quotes: Array<Quote> = [];

    public formQuotes() {
        this.quotes.push(new Quote("Роналдиньо", "«Я некрасивый. Но то, что я делаю, очаровывает»", "https://elasticbeanstalk-eu-north-1-242064348210.s3.eu-north-1.amazonaws.com/football/5e64abae517d3_esxlfrxwkaoudoz+(1).jpeg"))
        this.quotes.push(new Quote("Лев Яшин", "«Секрет в том, чтобы выкурить сигарету, чтобы успокоить нервы, а потом сделать большой глоток чего-нибудь покрепче, чтобы привести в тонус мышцы»", "https://elasticbeanstalk-eu-north-1-242064348210.s3.eu-north-1.amazonaws.com/football/img007+(1).jpeg"))
        this.quotes.push(new Quote("Йохан Кройф","«Итальянцы никогда никого не переигрывают, но им всегда очень легко проиграть»", this.img.kroif))
        this.quotes.push(new Quote("Йохан Кройф", "«Каждый недостаток может стать преимуществом»", this.img.kroif))
        this.quotes.push(new Quote("Лобановский", " «Игра забывается, результат остаётся»", "https://elasticbeanstalk-eu-north-1-242064348210.s3.eu-north-1.amazonaws.com/football/3a681064de04-1+(1).jpg"))
        this.quotes.push(new Quote("Арриго Сакки", "«Футбол – самое важное дело из всех неважных дел»", "https://elasticbeanstalk-eu-north-1-242064348210.s3.eu-north-1.amazonaws.com/football/ruec8ec6615e6-2.jpg"))
    }

    render(): React.ReactNode {
        this.formQuotes();
        const randIndex = getRand(0, this.quotes.length);
        const {author, text, img} = this.quotes[randIndex];
        return (
            <div className="quote-holder">
                <img src={img} alt=""/>
                <p>{text}</p>
                <b>{author}</b>
            </div>
        )
    }
}