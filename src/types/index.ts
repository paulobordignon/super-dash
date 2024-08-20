export interface IMovie {
  id: number;
  year: number;
  title: string;
  studios?: string[];
  producers?: string[];
  winner?: boolean;
}

interface IProducersWinsInterval {
  followingWin: number;
  interval: number;
  previousWin: number;
  producer: string;
}

interface IStudiosWinCount {
  name: string;
  winCount: number;
}

interface IYearsMultipleWinners {
  winnerCount: number;
  year: number;
}

export interface IDashboardData {
  studiosWinCount: IStudiosWinCount[];
  producersWinsInterval: {
    max: IProducersWinsInterval[];
    min: IProducersWinsInterval[];
  };
  yearsMultipleWinners: IYearsMultipleWinners[];
}
