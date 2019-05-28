import { HomePageResolverDataInterface } from './interface/home-page-resolver-data.interface';

export class HomePageResolverData implements HomePageResolverDataInterface {
    isAuthenticatedUser: boolean;
    currUser: string;
}