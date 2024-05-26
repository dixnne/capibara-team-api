export interface DateInfo {
    id: number,
    data: {
        petId: number,
        date: {
            day: number,
            month: number,
            year: number,
            hour: string
        },
        userId: number
    }
}