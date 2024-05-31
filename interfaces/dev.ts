export interface Dev {
    id: number,
    data: {
        name: string,
        details: string,
        image: string,
        tags: string[],
        jobs: string[],
        skills: {
            languages: string[],
            frameworks: string[],
            technologies: string[],
            tools: string[]
        },
        pets: number[]
    }
}