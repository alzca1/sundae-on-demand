import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function SummaryForm() {
  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
    </span>
  );

  const [checked, setChecked] = useState(false);
  return (
    <Form className='w-25'>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!checked}>
        Confirm order
      </Button>
    </Form>
  );
}
