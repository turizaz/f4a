export namespace IGame {
    export interface IInfo {
        playerFieldNumber: any
        gameId: any
        playerId: number
        event?: string
        fieldNumbersInGame?: number
    }
    export interface IGame {
        player_id: number,
        city_id: number,
        player_field_number: number,
        game_id: number,
        author_id: number
    }
}

