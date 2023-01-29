from urllib import request
import os
import openai
import ast
import json

from dotenv import load_dotenv

load_dotenv()

# JSON_RESPONSE = {
#     "egg": {"quantity": 5, "unit": ""},
#     "wagyu beef": {"quantity": 1, "unit": "kg"},
#     "zanhou noodles": {"quantity": 1, "unit": "kg"},
#     "milk": {"quantity": 1, "unit": "litre"},
#     "flour": {"quantity": 1, "unit": "kg"},
#     "sugar": {"quantity": 1, "unit": "kg"},
#     "butter": {"quantity": 1, "unit": "kg"},
#     "salt": {"quantity": 1, "unit": "kg"},
# }


def generate_recipe(JSON_RESPONSE):
    openai.api_key = os.getenv("OPENAI_API_KEY")

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=generate_chat_gpt_prompt(JSON_RESPONSE),
        temperature=0.5,
        max_tokens=3700,
    )
    return convert_response_to_dict(response)


def generate_chat_gpt_prompt(JSON_RESPONSE):
    """Generate a prompt for the chat GPT model."""
    prompt = "I want to be recommeneded receipes. I want Asian Cusiene Food. I have:\n"
    for item in JSON_RESPONSE:
        prompt += f"{JSON_RESPONSE[item]['quantity']} {JSON_RESPONSE[item]['unit']} of {item}\n"
    prompt += """What can I make? Generate the servings for one person. You are free to use ingredients I don't have but try to maximize both the taste of the food and the amount of existing ingredients used. Only recommend commonly eaten and popular items\n"""
    prompt += "List out all the ingredients in the following format. For example:\n"
    prompt += "{'Name': CAKE,"
    prompt += "  Ingredients: {"
    prompt += "  'flour': {'amount': '0.24'; 'unit': 'kg'}"
    prompt += "  'sugar': {'amount': '0.24'; 'unit': 'kg'}"
    prompt += "  'butter': {'amount': '0.24'; 'unit': 'kg'}"
    prompt += "  },"
    prompt += "  'Instructions': ["
    prompt += "  'Mix all the ingredients together',"
    prompt += "  'Bake for 30 minutes',"
    prompt += "  'Enjoy!',"
    prompt += "  ],"
    prompt += "}"
    prompt += "\nGive the response in JSON format without any line breaks, in other words return the JSON object all on the same line. Try to generate 3 recommendations that vary in type of food\n"
    return prompt


def convert_response_to_dict(response):
    """Convert the response to a dict."""
    response = response["choices"][0]["text"]
    response = ast.literal_eval(response)
    return json.dumps(response)


# print(generate_chat_gpt_prompt(JSON_RESPONSE))


def decode_and_save(uri):
    with request.urlopen(uri) as response:
        data = response.read()
    with open("image.png", "wb") as f:
        f.write(data)
