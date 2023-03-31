import { IApp } from "./IApp";
import { IImgViewer, IViewer } from "./IViewer";

export interface IState{
    app: IApp;
    viewer: IViewer;
    imgViewer: IImgViewer;
    // explorer: IExplorer;
}