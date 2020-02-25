import React from "react";
// import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { userFormValidation, IUserForm, EUserType, IUserType, userTypeOptions } from "../../data/entities";
// import { FormButton } from "../../../../components/form_button";
// import { Form } from "../../../../components/form";
// import { Grid } from "@material-ui/core";
// import { SelectInput } from "../../../../components/select_input";

interface IProps extends IFormProps<IUserForm> {}

export const UserForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <>
      {/* <Grid container justify="center">
        <Grid item md={8} lg={6}>
          <Form<IUserForm>
            {...props}
            initialValues={{
              name: "",
              balance: 0,
              salary: 0,
              info: "",
              type: EUserType.BUYER,
            }}
            validationSchema={userFormValidation}
          >
            {({ values }) => (
              <>
                <TextInput label="Name" name="name" />
                <TextInput label="balance" name="balance" type="number" />
                <TextInput label="salary" name="salary" type="number" />
                <TextInput label="info" name="info" />

                <SelectInput<IUserType>
                  value={values.type}
                  options={userTypeOptions}
                  name="type"
                  label="User type"
                  renderLabel={(a) => a.label}
                />

                <FormButton label={submitTitle} loading={loading} />
              </>
            )}
          </Form>
        </Grid>
      </Grid> */}
    </>
  );
};
