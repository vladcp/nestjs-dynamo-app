import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { dynamoDBClient, docClient } from 'src/aws-config/dynamoDBClient';
import {v4 as uuid} from 'uuid'
import 'dotenv/config';
import { DeleteCommand, GetCommand, PutCommand, UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { AttributeValue, CreateTableCommand, CreateTableCommandInput, CreateTableInput, ScanCommand, UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import tablescript from '../../table-script.json';

const { TABLE_NAME } = process.env

@Injectable()
export class BookService {
  async create(createBookDto: CreateBookDto) {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        bookId: uuid(),
        title: createBookDto.title,
        author: createBookDto.author,
        publicationYear: createBookDto.publicationYear
      }
    })
    const response = await docClient.send(command);
    console.log(response);
    return response;
  }

  async findAll() {
    const command = new ScanCommand({
      TableName: TABLE_NAME
    })
    const response = await docClient.send(command);
    console.log(response);
    return response;
  }2

  async findOne(bookId: string) {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { bookId }
    })
    const response = await docClient.send(command)
    console.log(response);
    return response;
  }

  async update(bookId: string, updateBookDto: UpdateBookDto) {
    const params ={
      TableName: TABLE_NAME,
      Key: { bookId },
      UpdateExpression: "set #title = :title, #author = :author, #publicationYear=:publicationYear",
      ExpressionAttributeNames: {
        '#title' : 'title',
        '#author' : 'author',
        '#publicationYear' : 'publicationYear',
      },
      ExpressionAttributeValues: {
        ':title': updateBookDto.title,
        ':author': updateBookDto.author,
        ':publicationYear': updateBookDto.publicationYear,
      },
      ReturnValues: "ALL_NEW",
    } 
    const command = new UpdateCommand(params as UpdateCommandInput)

    const response = await docClient.send(command)
    console.log(response);
    return response;
  }

  // partial updates... doesn't work
  buildUpdateExpression(bookId : string, updateBookDto: UpdateBookDto){
    let params = {
      TableName: TABLE_NAME,
      Key: { bookId },
      ExpressionAttributeValues: {},
      ExpressionAttributeNames: {},
      UpdateExpression: "",
      ReturnValues: "ALL_NEW"
    };
    let prefix = "set ";
    let attributes = Object.keys(updateBookDto);
    for (var attribute of attributes){
      params["UpdateExpression"] += prefix + "#" + attribute + " =:" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] = updateBookDto[attribute];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
    console.log(params)
    return params 
  }

  async remove(bookId: string) {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {bookId},
    })
    const response = await docClient.send(command);
    console.log(response);
    return response;
  }
  // testing only 
  async createTable() {
    const command = new CreateTableCommand({
        TableName: TABLE_NAME,
        KeySchema: [
          {
            AttributeName: "bookId",
            KeyType: "HASH"
          }
        ],
        AttributeDefinitions: [
          {
            AttributeName: "bookId",
            AttributeType: "S"
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
    })
    const response = await dynamoDBClient.send(command);
    console.log(response);
    return response;
  }
}
