import tensorflow as tf

def get_gaussian_kernel(kernel_size=5, sigma=1.0):
    x = tf.range(-kernel_size // 2 + 1, kernel_size // 2 + 1, dtype=tf.float32)
    x = tf.math.exp(-(x**2) / (2 * sigma**2))
    kernel_1d = x / tf.reduce_sum(x)
    kernel_2d = tf.tensordot(kernel_1d, kernel_1d, axes=0)
    kernel_2d = kernel_2d[:, :, tf.newaxis, tf.newaxis]
    return tf.repeat(kernel_2d, 3, axis=2)

def get_sobel_kernels():
    sobel_x = tf.constant([[-1., 0., 1.], [-2., 0., 2.], [-1., 0., 1.]], dtype=tf.float32)
    sobel_y = tf.constant([[-1., -2., -1.], [0., 0., 0.], [1., 2., 1.]], dtype=tf.float32)
    sobel_x = sobel_x[:, :, tf.newaxis, tf.newaxis]
    sobel_y = sobel_y[:, :, tf.newaxis, tf.newaxis]
    return tf.repeat(sobel_x, 3, axis=2), tf.repeat(sobel_y, 3, axis=2)

def get_laplacian_kernel():
    laplacian = tf.constant([[0., 1., 0.], [1., -4., 1.], [0., 1., 0.]], dtype=tf.float32)
    laplacian = laplacian[:, :, tf.newaxis, tf.newaxis]
    return tf.repeat(laplacian, 3, axis=2)

def preprocess_image(images, gaussian_kernel, sobel_x, sobel_y, laplacian_kernel):
    images = tf.cast(images, tf.float32) / 255.0
    if len(images.shape) == 3:
        images = tf.expand_dims(images, 0)

    blurred = tf.nn.depthwise_conv2d(images, gaussian_kernel, strides=[1, 1, 1, 1], padding='SAME')
    edges_x = tf.nn.depthwise_conv2d(blurred, sobel_x, strides=[1, 1, 1, 1], padding='SAME')
    edges_y = tf.nn.depthwise_conv2d(blurred, sobel_y, strides=[1, 1, 1, 1], padding='SAME')
    sobel_edges = tf.sqrt(tf.square(edges_x) + tf.square(edges_y))
    laplacian_edges = tf.nn.depthwise_conv2d(blurred, laplacian_kernel, strides=[1, 1, 1, 1], padding='SAME')

    enhanced = blurred + sobel_edges + laplacian_edges
    return tf.clip_by_value(enhanced, 0.0, 1.0)
