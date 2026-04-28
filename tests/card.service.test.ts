import request from 'supertest';
import app from '../src/app';

describe('POST /api/v1/cards/validate', () => {
  it('should return valid true for a valid Visa card', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '4111111111111111' });

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(true);
    expect(response.body.cardType).toBe('Visa');
    expect(response.body.message).toBe('Card number is valid');
  });

  it('should return valid true for a valid Mastercard', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '5500005555555559' });

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(true);
    expect(response.body.cardType).toBe('Mastercard');
    expect(response.body.message).toBe('Card number is valid');
  });

  it('should return valid false for an invalid card number', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '4111111111111112' });

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(false);
    expect(response.body.message).toBe('Card number is invalid');
  });

  it('should return 400 for missing card number', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.valid).toBe(false);
  });

  it('should return 400 for empty card number', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '' });

    expect(response.status).toBe(400);
    expect(response.body.valid).toBe(false);
  });

  it('should return 400 for non numeric characters', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: 'abcd1234efgh5678' });

    expect(response.status).toBe(400);
    expect(response.body.valid).toBe(false);
    expect(response.body.message).toBe('Card number must contain only digits');
  });

  it('should handle card number with spaces', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '4111 1111 1111 1111' });

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(true);
    expect(response.body.cardType).toBe('Visa');
  });

  it('should handle card number with dashes', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({ cardNumber: '4111-1111-1111-1111' });

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(true);
    expect(response.body.cardType).toBe('Visa');
  });
});