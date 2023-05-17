import { container } from "tsyringe";

import { DateProviderInterface } from "./dateProvider-interface";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";

container.registerSingleton<DateProviderInterface>(
    "DayjsDateProvider",
    DayjsDateProvider
);
