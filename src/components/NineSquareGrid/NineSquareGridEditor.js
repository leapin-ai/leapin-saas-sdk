import useControlValue from '@kne/use-control-value';
import NineSquareGrid from './NineSquareGrid';
import transform from 'lodash/transform';
import { Button, Flex, Typography } from 'antd';
import withIntlProvider from './withIntlProvider';
import { useIntl } from '@kne/react-intl';
import { EditOutlined } from '@ant-design/icons';
import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import classnames from 'classnames';
import style from './style.module.scss';

const NineSquareGridEditorField = withIntlProvider(
  createWithRemoteLoader({
    modules: ['components-core:FormInfo']
  })(({ remoteModules, disabled, ...props }) => {
    const [FormInfo] = remoteModules;
    const [value, onChange] = useControlValue(props);
    const { verticalTitle, horizontalTitle } = props;
    const { formatMessage } = useIntl();
    const { useFormModal } = FormInfo;
    const { Input, TextArea } = FormInfo.fields;
    const formModal = useFormModal();
    return (
      <NineSquareGrid
        size="200px"
        verticalTitle={verticalTitle}
        horizontalTitle={horizontalTitle}
        values={transform(
          Array.from({ length: 9 }),
          (result, item, index) => {
            const current = index + 1;
            const currentValue = get(value, current) || {};
            result[current] = (
              <Flex vertical gap={4} className={style['editor-item']}>
                <div className={style['editor-item-title']}>{currentValue.title}</div>
                <Typography.Paragraph
                  className={style['editor-item-content']}
                  ellipsis={{
                    rows: 3
                  }}
                >
                  {formatMessage({ id: 'description' })}:{currentValue.description}
                </Typography.Paragraph>
                <Typography.Paragraph
                  className={style['editor-item-content']}
                  ellipsis={{
                    rows: 3
                  }}
                >
                  {formatMessage({ id: 'recommendation' })}:{currentValue.recommendation}
                </Typography.Paragraph>
                {!disabled && (
                  <Button
                    type="link"
                    className={classnames('btn-no-padding', style['editor-item-btn'])}
                    icon={<EditOutlined />}
                    onClick={() => {
                      formModal({
                        size: 'small',
                        autoClose: true,
                        formProps: {
                          data: currentValue,
                          onSubmit: async data => {
                            onChange(values => {
                              return Object.assign({}, values, { [current]: data });
                            });
                          }
                        },
                        children: (
                          <FormInfo
                            column={1}
                            list={[
                              <Input name="title" label={formatMessage({ id: 'title' })} rule="REQ LEN-0-100" />,
                              <TextArea name="description" label={formatMessage({ id: 'description' })} maxLength={500} rule="REQ" />,
                              <TextArea name="recommendation" label={formatMessage({ id: 'recommendation' })} maxLength={500} rule="REQ" />
                            ]}
                          />
                        )
                      });
                    }}
                  >
                    {formatMessage({ id: 'edit' })}
                  </Button>
                )}
              </Flex>
            );
          },
          {}
        )}
      />
    );
  })
);

const NineSquareGridEditor = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, ...props }) => {
  const [FormInfo] = remoteModules;
  const { useOnChange } = FormInfo.hooks;
  const render = useOnChange(props);
  return render(NineSquareGridEditorField);
});

NineSquareGridEditor.Field = NineSquareGridEditorField;

export default NineSquareGridEditor;
