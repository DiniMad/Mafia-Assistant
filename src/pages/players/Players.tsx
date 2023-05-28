import Layout from '@/components/Layout'
import { Link, useSearchParams } from 'react-router-dom';
import appRoutes from '@/utilites/appRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';
import { useAppDispatch } from '@/store';
import { addPlayer, usePlayers } from '@/store/players';
import NewPlayer from './NewPlayer';
import Player from './Player';

function Players() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const players = usePlayers()

  const [params] = useSearchParams()
  const returnUrl = params.get("returnUrl") || appRoutes.home;


  const addNewPlayer = (playerName: string) => dispatch(addPlayer({ playerName }))

  return (
    <Layout pageTitle={t("players")} bottomMenu={<BottomMenu returnUrl={returnUrl} />}>
      <PlayersComponent>
        <PlayerList>
          {players.map(p => <Player key={p.id} playerId={p.id} playerName={p.name} />)}
        </PlayerList>
        <NewPlayer addNewPlayer={addNewPlayer} />
      </PlayersComponent>
    </Layout>
  )
}

const PlayersComponent = tw.div`flex flex-col justify-between h-full`

const PlayerList = tw.div`flex flex-col justify-start overflow-y-auto scrollbar-hide mb-1`;


const BottomMenu = ({ returnUrl }: { returnUrl: string }) => {
  return <div tw="flex justify-center items-center h-full w-full">
    <Link tw="flex justify-center items-center h-10 w-10"
      to={returnUrl}>
      <FontAwesomeIcon icon={faCheck} tw="text-white text-2xl" />
    </Link>
  </div>;
};


export default Players