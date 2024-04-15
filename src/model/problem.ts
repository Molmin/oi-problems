export class Problem {
    constructor(
        public origin: string,
        public title: string,
        public content: string,
        public judge: { time: number | [number, number], memory: number | [number, number], full_score?: number },
        public tags: string[] = [],
        public difficulty: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 = 0,
    ) { }
}
