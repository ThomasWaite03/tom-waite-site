import json
import boto3
import os

client = boto3.client('ses')

def send_message_handler(event, context):
    print(event)
    if is_valid_message(event["body"]):
        body = json.loads(event["body"])
        name = body['name']
        email = body['email']
        organization = body['organization']
        message = body['message']
        
        # Send message
        if organization is None:
            email_content = f"""<!DOCTYPE html>
            <html>
                <body>
                    <h2>{name} sent you a message on tomwaite.me</h2>
                    <p>
                        <b>Name:</b> {name}<br>
                        <b>Email:</b> {email}<br>
                    </p>
                    <p>{message}</p>
                </body>
            </html>"""
        else:
            email_content = f"""<!DOCTYPE html>
            <html>
                <body>
                    <h2>{name} sent you a message on tomwaite.me</h2>
                    <p>
                        <b>Name:</b> {name}<br>
                        <b>Email:</b> {email}<br>
                        <b>Organization:</b> {organization}<br>
                    </p>
                    <p>{message}</p>
                </body>
            </html>"""
        
        try:
            response = client.send_email(
                Source='messages@tomwaite.me',
                Destination={
                    'ToAddresses': [
                        os.environ['TOM_EMAIL'],
                    ]
                },
                Message={
                    'Subject': {
                        'Data': f'{name} sent you a message'
                    },
                    'Body': {
                        'Html': {
                            'Data': email_content
                        }
                    }
                },
                ReplyToAddresses=[
                    email,
                ]
            )
        except botocore.exceptions.ClientError:
            return get_response(400)
        
        return get_response(200)
    else:
        return get_response(400)


def is_valid_message(body):
    body = json.loads(body)
    
    if all([param in body for param in ['name', 'email', 'message', 'organization']]):
        if body['name'] is None or body['name'] == '':
            return False
        elif body['email'] is None or body['email'] == '' or '@' not in body['email']:
            return False
        elif body['message'] is None or body['message'] == '':
            return False
        else:
            return True
    else:
        return False

def get_response(statusCode):
    if statusCode > 299:
        return {
            'statusCode': statusCode
        }
    else:
        return {
            'statusCode': statusCode,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST'
            }
        }