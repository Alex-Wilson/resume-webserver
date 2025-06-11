# AWS Certified AI Practitioner

## About

### Purpose: 
This certification is designed for individuals who want to demonstrate a foundational understanding of artificial intelligence (AI), machine learning (ML), and generative AI concepts within the AWS Cloud. It is suitable for both technical and non-technical roles, such as business analysts, project managers, IT support, marketing professionals, and sales teams who interact with AI/ML solutions or need to understand their applications.

### Format: 
Multiple Choice, Multiple Response, Ordering, Matching, and Case Study

### Time and Length of Test: 
90 minutes, 65 questions

### Passing Score:
70% (46/65)

### Exam Content Breakdown:
- Fundamentals of AI and ML: (20%, Max 13)
- Fundamentals of Generative AI: (24%, Max 16)
- Applications of Foundation Models: (28%, Max 18)
- Guidelines for Responsible AI: (14%, Max 9)
- Security, Compliance, and Governance for AI Solutions: (14%, Max 9)

### Length of Certification:
Valid for 3 years

### Link to Exam Guide:
https://d1.awsstatic.com/training-and-certification/docs-ai-practitioner/AWS-Certified-AI-Practitioner_Exam-Guide.pdf

### Link to Exam: 
https://aws.amazon.com/certification/certified-ai-practitioner/


## Study Resources
FreeCodeCamp YouTube Video: https://www.youtube.com/watch?v=WZeZZ8_W-M4

## Intro for Skids
Artificial Intelligence (AI), put simply, is when a computer is designed to recognize patterns, solve problems, make predictions, and even generate its own content. In doing so, it can appear to "think" and "learn" in ways that mimic natural intelligence. When building or deploying AI solutions, there’s usually a set of common steps or a pattern that’s followed. This will be called the AI Development Lifecycle.


## AI Devlopement Lifecycle
A step-by-step process used to build, train, and deploy AI systems. Think of it like a recipe that guides you from a raw idea all the way to a working AI product. It’s a pattern followed by data scientists, engineers, and AI teams to make sure the AI works well and solves the right problems.









## Core AI Concepts

Artificial Intelligence (AI):
A field of computer science focused on creating systems that can perform tasks requiring human-like intelligence, such as reasoning, learning, decision-making, and language understanding. AI encompasses subfields like machine learning, natural language processing, and robotics. In practice, AI enables applications such as voice assistants, recommendation systems, and autonomous vehicles by mimicking cognitive functions through algorithms and data-driven models.

Machine Learning (ML):
A subset of artificial intelligence that focuses on developing algorithms that enable computers to learn patterns from data and make decisions or predictions without being explicitly programmed. It includes techniques such as supervised learning, unsupervised learning, and reinforcement learning. In AI systems, machine learning allows models to improve performance over time through exposure to more data, supporting tasks like image recognition, fraud detection, and language translation.

Deep Learning:
A specialized branch of machine learning that uses neural networks with many layers to model complex patterns in large datasets. Deep learning excels at processing unstructured data such as images, audio, and natural language. Applications include voice assistants, autonomous driving, and facial recognition. Typically considered neural networks with three layers or more.

Neural Network:
A computational model composed of layers of interconnected units called neurons that process information by applying weighted sums and activation functions. Neural networks learn from data by adjusting these weights through optimization algorithms such as gradient descent. They are foundational to deep learning and are used in tasks like classification, regression, and pattern recognition.

Backpropagation:
A training algorithm used in neural networks to minimize prediction error by adjusting the model’s weights. It works by computing the gradient of the loss function with respect to each weight using the chain rule of calculus, starting from the output layer and moving backward through the network. These gradients are then used in conjunction with optimization methods like gradient descent to update the weights. Backpropagation is essential for enabling deep networks to learn complex patterns from data.

Loss Function / Cost Function:
A measure of how well a model's predictions match actual results (e.g., MSE, log loss).

Gradient Descent:
An optimization algorithm used to minimize a loss function by adjusting model weights.

Epoch / Batch / Iteration:
Definitions for units of training in deep learning.

Bias-Variance Tradeoff:
Explains the balance between model complexity (variance) and error due to incorrect assumptions (bias).

Overfitting / Underfitting:
Key concepts related to model generalization and performance.

## Learning Types and Paradigms
Supervised Learning:
A type of machine learning where algorithms are trained on labeled datasets, meaning each input is paired with a correct output. The model learns to map inputs to outputs and is evaluated on its ability to predict outcomes for new data. Common applications include spam detection, medical diagnosis, and credit scoring.

Unsupervised Learning:
A type of machine learning that analyzes data without labeled outcomes. The algorithm identifies patterns, groupings, or structures within the data, such as clusters or associations. It is often used in customer segmentation, anomaly detection, and data compression.

Reinforcement Learning (RL):
A type of machine learning where an agent learns to make decisions by interacting with an environment and receiving feedback in the form of rewards or penalties. Over time, the agent develops a strategy to maximize cumulative reward. It is used in robotics, game playing, and recommendation systems.

Semi-Supervised Learning:
A learning approach that combines a small amount of labeled data with a large amount of unlabeled data to improve model performance. It is useful when labeling data is expensive or time-consuming.

Self-Supervised Learning:
A form of unsupervised learning where the model generates its own labels from the input data. Often used in representation learning, it enables pretraining on large datasets without manual labeling. Common in natural language processing and computer vision.

Multi-Instance Learning:
A learning setting where the model receives labeled groups (bags) of instances, but not individual instance labels. The goal is to learn from these bags to classify new ones. Often applied in medical diagnosis and image classification where fine-grained labels are unavailable.

## Data Preparation and Preprocessing

Statistics:
A branch of mathematics focused on collecting, analyzing, and interpreting data. It has two main branches: descriptive statistics, which summarizes data, and inferential statistics, which makes predictions or inferences about a population from a sample. In AI, statistics is used to understand data patterns, evaluate models, and manage uncertainty in decision-making.

Data Cleaning:
The process of detecting and correcting errors, inconsistencies, and inaccuracies in data to improve its quality and reliability. This involves handling missing values, removing duplicates, correcting formatting issues, and standardizing entries. In machine learning and AI, clean data is critical to ensure that models learn accurate patterns and produce reliable outcomes.

Text-Wrangling or Text Pre-Processing:
The process of preparing raw text data for analysis by removing noise and formatting inconsistencies. This includes steps such as lowercasing, removing punctuation or stop words, correcting misspellings, and tokenization. Clean, structured text is essential for accurate NLP model performance.

Feature Engineering:
The process of transforming raw data into meaningful features for model input.

Feature Selection:
The process of choosing the most relevant features to reduce dimensionality and improve performance.
Learning Types and Paradigms

## Nueral Network Architecture
Feedforward Neural Network (FNN):
The simplest form of neural network, where information flows in one direction—from input to output—without any cycles or feedback loops. It consists of an input layer, one or more hidden layers, and an output layer. FNNs are used for tasks where a static input produces a static output, such as image classification or basic predictive modeling.

Recurrent Neural Network (RNN):
A neural network designed for sequential data, where connections form loops that allow information to persist across time steps. RNNs are used for tasks like language modeling, time-series prediction, and speech recognition.

Convolutional Neural Network (CNN):
A type of neural network designed specifically for processing grid-like data such as images. It uses convolutional layers that apply filters to detect spatial features like edges, shapes, or textures, followed by pooling layers that reduce dimensionality. CNNs are widely used in computer vision tasks including object detection, facial recognition, and medical imaging.

Generative Adversarial Network (GAN):
A deep learning architecture consisting of two neural networks—a generator and a discriminator—that compete in a game-theoretic setup. The generator creates synthetic data, while the discriminator evaluates whether data is real or generated. Through this adversarial process, GANs learn to produce highly realistic data, such as images, audio, or text.

Deep Belief Network (DBN):
A type of deep neural network composed of multiple layers of unsupervised models, typically stacked Restricted Boltzmann Machines (RBMs). Each layer learns to represent features of the data hierarchically, with lower layers learning simple features and higher layers capturing more abstract representations. DBNs are trained layer by layer in an unsupervised fashion, followed by fine-tuning with supervised learning. They were an early architecture used in deep learning for tasks such as image and speech recognition.

Stacked Autoencoders (SAE):
A deep learning architecture built by stacking multiple autoencoders, where the output of each layer is used as the input for the next. Each autoencoder consists of an encoder that compresses input data and a decoder that reconstructs it. The model learns compact, hierarchical feature representations of data, typically in an unsupervised manner. Stacked autoencoders are useful for dimensionality reduction, anomaly detection, and pretraining deep networks.

Restricted Boltzmann Machine (RBM):
A type of generative stochastic neural network that learns a probability distribution over its input data. It consists of two layers: a visible layer (input data) and a hidden layer (features), with symmetric connections and no intra-layer connections. RBMs are used for feature learning, dimensionality reduction, and as building blocks for deeper networks like DBNs. Training is typically done using a method called contrastive divergence.

### Inference and Reasoning Approaches
Inductive:
A reasoning approach where general rules or patterns are inferred from specific observations. In machine learning, inductive inference refers to building models that generalize from training data to unseen data.

Deductive:
A reasoning approach that applies general rules to specific cases to derive conclusions. Deductive logic is less common in ML, but underlies rule-based systems and expert systems.

Transductive:
A reasoning method where the model makes predictions only for specific test instances rather than learning a general rule for unseen data. Transductive learning is used in tasks like graph-based semi-supervised learning and label propagation.

### Natural Language Processing (NLP)
Natural Language Processing (NLP):
A subfield of artificial intelligence that focuses on enabling computers to understand, interpret, and generate human language. NLP combines linguistics and machine learning to support tasks such as sentiment analysis, translation, speech recognition, and question answering.

Language Understanding:
The ability of a system to comprehend the meaning and intent behind human language inputs. It involves parsing syntax, recognizing context, identifying entities, and extracting key information. In NLP, language understanding enables functions like virtual assistants, chatbots, and search engines to interpret user queries accurately.

Sentiment Analysis:
A natural language processing technique used to determine the emotional tone or subjective meaning behind text. It classifies text as positive, negative, or neutral, and can also detect intensity or specific emotions. Sentiment analysis is commonly used in customer feedback analysis, social media monitoring, and brand reputation management.

### Traditional ML Tehniques









Fully Connected Feed Forward Neural Network:
A neural network where each neuron in one layer is connected to every neuron in the next layer. It is the most basic structure in neural networks and is often used as a foundation for more complex architectures.




## Fundamentals of GenAI

## Applicaitons of Foundation Models

## AWS Traditional AI Pipelines

## AWS Managed AI Services

## AWS GenAI and LLM Services

## Guidelines for Responsible AI

## Security, Compliance, and Governance for AI Solutions




==========================================================================

### NEEDS TO BE EDITED

Cross-Validation: A resampling technique used to evaluate model performance on unseen data.




### Types of Machine Learning

#### Learning Problems
**Supervised Learning:** A type of machine learning where algorithms are trained on labeled datasets, meaning each input is paired with a correct output. The model learns to map inputs to outputs and is evaluated on its ability to predict outcomes for new data. Common applications include spam detection, medical diagnosis, and credit scoring.


**Reinforcement Learning (RL):** A type of machine learning where an agent learns to make decisions by interacting with an environment and receiving feedback in the form of rewards or penalties. Over time, the agent develops a strategy to maximize cumulative reward. It is used in robotics, game playing, and recommendation systems.

**Neural Network:**
A computational model composed of layers of interconnected units called neurons that process information by applying weighted sums and activation functions. Neural networks learn from data by adjusting these weights through optimization algorithms such as gradient descent. They are foundational to deep learning and are used in tasks like classification, regression, and pattern recognition.

**Convolutional Neural Network (CNN):**
A type of neural network designed specifically for processing grid-like data such as images. It uses convolutional layers that apply filters to detect spatial features like edges, shapes, or textures, followed by pooling layers that reduce dimensionality. CNNs are widely used in computer vision tasks including object detection, facial recognition, and medical imaging.

**Generative Adversarial Network (GAN):**
A deep learning architecture consisting of two neural networks—a generator and a discriminator—that compete in a game-theoretic setup. The generator creates synthetic data, while the discriminator evaluates whether data is real or generated. Through this adversarial process, GANs learn to produce highly realistic data, such as images, audio, or text.

**Feedforward Neural Network (FNN):**
The simplest form of neural network, where information flows in one direction—from input to output—without any cycles or feedback loops. It consists of an input layer, one or more hidden layers, and an output layer. FNNs are used for tasks where a static input produces a static output, such as image classification or basic predictive modeling.

**Backpropagation:**
A training algorithm used in neural networks to minimize prediction error by adjusting the model’s weights. It works by computing the gradient of the loss function with respect to each weight using the chain rule of calculus, starting from the output layer and moving backward through the network. These gradients are then used in conjunction with optimization methods like gradient descent to update the weights. Backpropagation is essential for enabling deep networks to learn complex patterns from data.

**Deep Learning:** A specialized branch of machine learning that uses neural networks with many layers to model complex patterns in large datasets. Deep learning excels at processing unstructured data such as images, audio, and natural language. Applications include voice assistants, autonomous driving, and facial recognition. Typically considered nueral networks with 3-Layers or more.

**Natural Language Processing (NLP):** A subfield of artificial intelligence that focuses on enabling computers to understand, interpret, and generate human language. NLP combines linguistics and machine learning to support tasks such as sentiment analysis, translation, speech recognition, and question answering.

Fully Connected Feed Forward Neural Network
Recurrent Neural Network (RNN)



#### Learning Techniques

**Multi-Task Learning:** A technique where a model is trained to perform multiple related tasks simultaneously, allowing shared learning across tasks and often improving generalization. Useful in domains like NLP where tasks like translation and summarization benefit from shared representations.

**Active Learning:** A learning approach where the model can query an oracle (e.g., a human annotator) for labels on specific data points that it finds most informative. It reduces the labeling effort by focusing on the most valuable examples.

**Online Learning:** A method where the model learns incrementally from a continuous stream of data, updating itself as new data arrives. Useful in scenarios where data arrives in real time or storage is limited.

**Transfer Learning:** A technique where knowledge gained from training a model on one task is reused or adapted for a different but related task. Commonly used in deep learning, especially for tasks with limited labeled data.

**Ensemble Learning:** A method that combines multiple models to improve prediction accuracy and robustness. Examples include bagging (e.g., random forests), boosting (e.g., XGBoost), and stacking.

### Regression

**Regression:** A statistical method used to model the relationship between a dependent variable and one or more independent variables, typically for the purpose of prediction. In machine learning, regression algorithms estimate continuous outcomes, such as sales forecasts or temperature predictions. Common techniques include linear regression, logistic regression (for classification), and polynomial regression.

**Regression Error:** The difference between the predicted value generated by a regression model and the actual observed value. It measures how far off a model's predictions are from reality. Common types of regression error include mean absolute error (MAE), mean squared error (MSE), and root mean squared error (RMSE). Minimizing error is essential for improving a model’s accuracy and reliability in tasks like price estimation or demand forecasting.

#### Regression Algorithms:
**Linear Regression:** A simple regression technique that models the relationship between one independent variable and a continuous dependent variable using a straight line. It assumes a linear correlation between the two variables.

**Multi-Linear Regression:** An extension of linear regression that uses two or more independent variables to predict a single continuous dependent variable. It fits a plane (or hyperplane) in multidimensional space to minimize prediction error.

**Polynomial Regression:** A form of regression that models the relationship between variables as an nth-degree polynomial. It is used when the relationship between variables is non-linear but can still be represented in a smooth curve.

**Support Vector Regression (SVR):** A version of support vector machines adapted for regression tasks. It tries to fit the best line (or hyperplane) within a specified margin of tolerance, focusing on ignoring minor errors to generalize better.

**Decision Tree Regression:** A non-linear regression technique that splits the dataset into branches based on feature values. Each leaf represents a predicted value, and the structure allows the model to capture complex patterns without requiring feature scaling.

**Random Forrest Regression:** An ensemble method that builds multiple decision trees during training and outputs the average of their predictions. It reduces overfitting and improves accuracy compared to a single tree.

**Loss Function:** 

**Activation Layer:**

**Neural Network Density:**




### Classification
**Classification:** A type of supervised learning used to predict categorical labels or classes based on input features. The model learns from labeled data and assigns new inputs to one of several predefined categories. Common examples include email spam detection, medical diagnosis (e.g., benign vs. malignant), and image recognition (e.g., identifying animals in photos).

#### Classification Algorithms

**Logistic Regression:** A statistical method used to model binary or multi-class outcomes. It predicts the probability that an input belongs to a particular category using the logistic (sigmoid) function. Despite its name, it is used for classification, not regression.

**K-Nearest Neighbours:** A non-parametric, instance-based learning algorithm that classifies new data points based on the majority class among its 'k' closest neighbors in the training set. It is simple, effective, and sensitive to the choice of 'k' and distance metric.

**Support Vecor Machines (SVM):** A powerful classification algorithm that finds the optimal hyperplane that maximally separates classes in the feature space. It works well for both linear and non-linear classification tasks using kernel functions.

**Naive Bayes:** A probabilistic classification technique based on Bayes’ Theorem, assuming feature independence. It is computationally efficient and works well with high-dimensional datasets, especially in text classification.

**Decision Tree Classification:** A model that uses a tree-like structure to make decisions based on feature values. Each internal node represents a decision rule, each branch an outcome, and each leaf a class label. It is intuitive and interpretable but prone to overfitting.

**Random Forrest Classification:** An ensemble method that constructs multiple decision trees and outputs the most common class among them. It reduces variance and improves generalization over single decision trees.

### Clustering
**Clustering:** An unsupervised learning technique used to group data points into clusters based on their similarity or distance from one another. Unlike classification, clustering does not use labeled data; instead, it identifies natural groupings or patterns within the dataset. Clustering is often used for customer segmentation, anomaly detection, and data exploration. Common algorithms include k-means, DBSCAN, and hierarchical clustering.

#### Clustering Algorithms
**K-Means:**
A centroid-based clustering algorithm that partitions data into k clusters by minimizing the variance within each cluster. It assigns each data point to the nearest cluster center and updates centers iteratively. It works best when clusters are spherical and roughly equal in size.

**Density-Based Spatial Clustering of Applications with Noise (DBScan):**
A density-based clustering algorithm that groups together points that are closely packed while marking points in low-density regions as outliers. It does not require specifying the number of clusters and is well-suited for detecting clusters of arbitrary shape.

**K-Modes:**
An adaptation of K-Means for clustering categorical data. Instead of using means, it uses modes (most frequent values) to define cluster centers and a simple matching dissimilarity measure to assign data points.

### Association

**Association:**
A type of unsupervised learning used to discover interesting relationships, patterns, or rules among variables in large datasets. It is widely used in market basket analysis, where it helps identify items frequently bought together.

#### Association Algorithms
**Apriori:**
An algorithm that identifies frequent itemsets by iteratively expanding them and applying a minimum support threshold. It then uses these itemsets to generate association rules. It is easy to understand but computationally expensive for large datasets.

**Equivalence Class Clustering and bottom-up Lattice Traversal (Eclat):**
A depth-first algorithm that uses vertical data representation to find frequent itemsets. It is generally faster and more memory-efficient than Apriori for dense datasets.

**Frequent Pattern Growth (FP-Growth):**
An algorithm that uses a compact data structure called an FP-tree to avoid candidate generation. It builds the tree once and recursively mines it for frequent itemsets, making it faster and more scalable than Apriori in many cases.

### Dimensionality Reduction

**Dimensionality Reduction:**
A technique used to reduce the number of input variables (features) in a dataset while preserving as much relevant information as possible. It helps simplify models, reduce computation time, eliminate noise, and improve visualization, especially in high-dimensional datasets.

#### Dimensionality Reduction Algorithms

**Principal Component Analysis (PCA):**
A linear transformation technique that projects data onto a lower-dimensional space by identifying the directions (principal components) that capture the maximum variance. It is widely used for compression, visualization, and noise reduction.

**Linear Discriminant Analysis (LDA):**
A supervised dimensionality reduction method that projects data in a way that maximizes class separability. It is commonly used for feature extraction in classification tasks by preserving discriminative information.

**Generalized Discriminant Analysis (GDA):**
An extension of LDA that uses kernel functions to handle non-linear class boundaries. It projects data into a higher-dimensional feature space before applying LDA, making it suitable for complex, non-linearly separable data.

**Singular Value Decomposition (SVD):**
A matrix factorization technique that decomposes a dataset into three matrices, capturing its essential structure with fewer dimensions. In machine learning, it is commonly used for dimensionality reduction, especially in recommendation systems and latent semantic analysis.

**Latent Dirichlet Allocation (LDA):**
A generative probabilistic model used to identify topics within a collection of documents. It assumes each document is a mixture of topics and each topic is a distribution over words. LDA is widely used for topic modeling and organizing large text datasets.

**Latent Semantic Analysis (LSA):**
A technique for extracting relationships between terms and documents by applying SVD to a term-document matrix. It reduces noise and reveals hidden semantic structures, making it useful for information retrieval, indexing, and text similarity tasks.

**t-distributed Stochastic Neighbor Embedding (t-SNE):**
A non-linear dimensionality reduction technique used for visualizing high-dimensional data in two or three dimensions. It emphasizes preserving local structure (i.e., the relative distance between nearby points) and is widely used for exploratory data analysis in fields like bioinformatics and computer vision.
