figureS = [
    [0, 1, 1],
    [1, 1, 0]
]
figureZ = [
    [1, 1, 0],
    [0, 1, 1]
]
figureT = [
    [1, 1, 1],
    [0, 1, 0],
]
figureI = [
    [1,1,1,1]
]
figureJ = [
    [0, 1],
    [0, 1],
    [1, 1],
]
figureL = [
    [1, 0],
    [1, 0],
    [1, 1],
]
figureO = [
    [1, 1],
    [1, 1]
]
class Figures
{
    figuresPool = new Array();
    constructor(){
        this.figuresPool = [
            new Figure(2,2,figureO),
            new Figure(2,3,figureL),
            new Figure(2,3,figureJ),
            new Figure(3,2,figureS),
            new Figure(3,2,figureZ),
            new Figure(3,2,figureT),
            new Figure(4,1,figureI)
        ]
    }
}