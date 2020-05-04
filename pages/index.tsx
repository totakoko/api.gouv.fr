import React from 'react';
import { GetStaticProps } from 'next';

import { getAllAPIs, IApi } from '../model';
import Page from '../layouts/page';

import {
  UseCaseSection,
  ApiTripletSection,
  ExplanationSection,
  Baseline,
} from '../components/home';

interface IProps {
  top15Api: IApi[];
}

const Home: React.FC<IProps> = ({ top15Api }) => (
  <Page
    title="Api.gouv.fr"
    description="Simplifiez le partage et la circulation des données administratives grace à api.gouv, le site qui référence toutes les APIs du service public."
  >
    <Baseline />
    <ExplanationSection />
    <ApiTripletSection apiList={top15Api} />
    <div className="content-container layout-center">
      <h2>Ils ont créé de nouveaux services innovants avec des APIs&nbsp;:</h2>
    </div>
    <UseCaseSection />

    <style jsx>{`
      h2 {
        margin: 100px 0 0;
      }
    `}</style>
  </Page>
);

export const getStaticProps: GetStaticProps = async () => {
  const apiList = await getAllAPIs();

  return {
    props: {
      top15Api: apiList
        .sort((a, b) => ((a.visits_2019 || 0) > (b.visits_2019 || 0) ? -1 : 1))
        .slice(0, 15),
    },
  };
};

export default Home;