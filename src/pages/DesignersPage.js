import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../components/SpaceComponent";

import { useGetAllDesignersQuery } from "../data/designersSlice";
import DesignersCard from "../components/DesignersCard";

const DesignersPage = () => {
  const { t } = useTranslation();
  const { data: designersData, isLoading, error } = useGetAllDesignersQuery();
  const [activeDesigners, setAllDesigners] = useState([]);


  useEffect(() => {
    setAllDesigners(designersData?.filter((item) => item.activeStatus));
  }, [designersData]);

  return (
    <div className="w-full designers-page flex flex-col items-center">
      <div className="space-component-container w-full">
        <SpaceComponent data={{ data: t("designers") }} />
      </div>
      <div className="designers-page-inner-container pt-10 pb-5 lg:pb-0">
        <div className="designers-cards-container w-full flex flex-wrap justify-evenly gap-x-[30px]">
          {activeDesigners &&
            activeDesigners.map((el, i) => <DesignersCard key={i} data={el} />)}
        </div>
      </div>
    </div>
  );
};

export default DesignersPage;
