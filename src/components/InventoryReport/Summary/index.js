import { createWithRemoteLoader } from '@kne/remote-loader';
import NineSquareGrid from './NineSquareGrid';
import BarChart from './BarChart';
import CircularChart from './CircularChart';
import ScoreRange from './ScoreRange';
import { Flex, Divider } from 'antd';
import Retention from './Retention';
import style from './style.module.scss';
import { ReactComponent as NineSquareGridIcon } from './nine-square-grid.svg';
import get from 'lodash/get';
import transform from 'lodash/transform';
import { useIntl } from '@kne/react-intl';

const Summary = createWithRemoteLoader({
  modules: ['components-core:InfoPage', 'components-core:Global@useGlobalContext', 'components-core:StateTag']
})(({ remoteModules, data }) => {
  const [InfoPage, useGlobalContext, StateTag] = remoteModules;
  const { formatMessage } = useIntl();
  const { locale } = useGlobalContext();

  const dimension = transform(
    get(data, 'dimension_answers_score', []),
    (result, item) => {
      if (!result.columns) {
        result.columns = [];
        result.session = [];
      }
      if (!result.data) {
        result.data = {};
      }
      if (Array.isArray(get(item, 'inventory_user_answers'))) {
        const session = get(item, 'inventory_user_answers').map(item => {
          return {
            title: get(item, 'competency'),
            score: get(item, 'avg_score', 0),
            tag: get(item, 'score_description'),
            range: get(item, 'soft_score_range.range'),
            point: get(item, 'soft_score_range.avg_score'),
            interpretation: get(item, `score_interpretation[${locale === 'en-US' ? 'en' : 'zh'}]`),
            suggestions: get(item, `score_suggestions[${locale === 'en-US' ? 'en' : 'zh'}]`)
          };
        });
        result.session.push(...session);
        session.forEach(item => {
          result.columns.push({
            name: item.title,
            title: item.title
          });
          result.data = Object.assign({}, result.data, {
            [item.title]: item.score
          });
        });
      }
    },
    {}
  );

  const retention = (get(data, 'cdpa_data') || []).find(item => {
    return item.competency_key === 'retention' && item.answer_type === 2;
  })?.body;
  const mobility = (get(data, 'cdpa_data') || []).find(item => {
    return item.competency_key === 'mobility' && item.answer_type === 2;
  })?.body;
  const careerInterests = (get(data, 'cdpa_data') || []).find(item => {
    return item.competency_key === 'career_interests' && item.answer_type === 2;
  })?.body;
  const strength = get(data, 'form_ability_analysis.advantage');
  const improvement = get(data, 'form_ability_analysis.to_be_improved');
  return (
    <InfoPage>
      <InfoPage.Part title={formatMessage({ id: 'aiTalentSummary' })}>
        <Flex vertical gap={52}>
          <Flex vertical gap={40} align="center" className={style['card-box']}>
            <Flex gap={40}>
              <NineSquareGrid value={get(data, 'grid_data.index')} />
              <Flex className={style['nine-square-grid-right']} vertical gap={12} justify="center" align="center">
                <NineSquareGridIcon style={{ width: '64px', height: '64px' }} />
                <div style={{ fontSize: '12px' }}>{formatMessage({ id: 'nineSquareGrid' })}</div>
                <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{get(data, 'grid_data.title')}</div>
              </Flex>
            </Flex>
            <Retention
              data={{
                potential: get(data, 'grid_data.y.level'),
                lossImpact: get(data, 'grid_data.loss_impact'),
                lastPerformanceRating: get(data, 'grid_data.x.score'),
                performanceLevel: get(data, 'grid_data.x.level')
              }}
            />
          </Flex>
          <Flex vertical gap={24} className={style['card-box-grey']}>
            {get(data, 'grid_data.description') && (
              <>
                <Flex vertical gap={4}>
                  <div className={style['card-box-grey-title']}>{formatMessage({ id: 'traits' })}</div>
                  <div className={style['card-box-grey-content']}>{get(data, 'grid_data.description')}</div>
                </Flex>
                {get(data, 'grid_data.recommendation') && <Divider className={style['card-box-grey-divider']} />}
              </>
            )}
            {get(data, 'grid_data.recommendation') && (
              <Flex vertical gap={4}>
                <div className={style['card-box-grey-title']}>{formatMessage({ id: 'actionRequired' })}</div>
                <div className={style['card-box-grey-content']}>{get(data, 'grid_data.recommendation')}</div>
              </Flex>
            )}
            {get(data, 'report_summary') && (
              <Flex vertical gap={4}>
                <div className={style['card-box-grey-title']}>{formatMessage({ id: 'summary' })}</div>
                <Flex className={style['card-box-grey-content']} vertical gap={12}>
                  {get(data, `report_summary[${locale === 'en-US' ? 'en' : 'zh'}]`)}
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
      </InfoPage.Part>
      <InfoPage.Part title={formatMessage({ id: 'dimensionalAnalysis' })}>
        <Flex vertical gap={52}>
          <div className={style['card-box']}>
            <BarChart
              {...dimension}
              className={style['bar-chart']}
              title="Potential Dimension"
              group={[
                {
                  label: formatMessage({ id: 'developed' }),
                  value: 60
                },
                {
                  label: formatMessage({ id: 'qualified' }),
                  value: 20
                },
                {
                  label: formatMessage({ id: 'excellent' }),
                  value: 20
                }
              ]}
            />
          </div>
          {dimension.session &&
            dimension.session.length > 0 &&
            dimension.session.map(({ title, score, tag, range, point, interpretation, suggestions }) => {
              return (
                <Flex vertical gap={16} className={style['card-box']}>
                  <Flex align="center" gap={12}>
                    <CircularChart progress={score} title={tag} />
                    <Flex flex={1}>
                      <ScoreRange value={score} range={range} point={point} title={title} />
                    </Flex>
                  </Flex>
                  <Flex className={style['card-box-grey']} vertical gap={12}>
                    {score === 0 && (
                      <>
                        <div>{formatMessage({ id: 'scoreFiled' })}:</div>
                        <div className={style['card-box-grey-content']}>{formatMessage({ id: 'scoreFiledDescription' })}</div>
                      </>
                    )}
                    {score > 0 && (
                      <>
                        <div style={{ fontWeight: 'bold' }}>{interpretation}</div>
                        {suggestions && suggestions.length > 0 && (
                          <>
                            <div style={{ fontWeight: 'bold' }}>{formatMessage({ id: 'suggestionsForImproving' })}</div>
                            <div className={style['card-box-grey-content']}>
                              {suggestions.map((str, index) => (
                                <div key={index}>{str}</div>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </Flex>
                </Flex>
              );
            })}
        </Flex>
      </InfoPage.Part>
      {retention && (
        <InfoPage.Part title={formatMessage({ id: 'retention' })}>
          <Flex className={style['card-box-grey']}>{retention}</Flex>
        </InfoPage.Part>
      )}
      {mobility && (
        <InfoPage.Part title={formatMessage({ id: 'mobility' })}>
          <Flex className={style['card-box-grey']}>{mobility}</Flex>
        </InfoPage.Part>
      )}
      {careerInterests && (
        <InfoPage.Part title={formatMessage({ id: 'careerInterests' })}>
          <Flex className={style['card-box-grey']}>{careerInterests}</Flex>
        </InfoPage.Part>
      )}
    </InfoPage>
  );
});

export default Summary;
