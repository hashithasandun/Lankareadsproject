const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book'); // Adjust path if needed

// Load environment variables
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));

// Updated book data with correct images
const books = [
    {
        name: 'The Great Gatsby',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKi5lknrw7SIwZ01RQRqyvtXz2bFxrUsGVpA&s',
        price: 10.99,
        category: 'Historic',
        description: 'A novel written by American author F. Scott Fitzgerald.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'To Kill a Mockingbird',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVo4KYmcwAMzNQy2_Larrs0NfPGXuHEwkVQ&s',
        price: 8.99,
        category: 'Classic',
        description: 'A novel by Harper Lee published in 1960.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: '1984',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV4yWihrnwBCaQNXCMF_zSIAPDMidcLtnR3g&s',
        price: 12.99,
        category: 'Dystopian',
        description: 'A novel by George Orwell published in 1949.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'Moby Dick',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKnFUVQeHc9uFraXFTKTDVj0crQV0PyVK8eg&s',
        price: 9.99,
        category: 'Adventure',
        description: 'A novel by Herman Melville published in 1851.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'War and Peace',
        image: 'https://m.media-amazon.com/images/I/81oHM-dzefL._AC_UF1000,1000_QL80_.jpg',
        price: 14.99,
        category: 'Historic',
        description: 'A novel by Leo Tolstoy published from 1865 to 1869.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'The Catcher in the Rye',
        image: 'https://npr.brightspotcdn.com/dims4/default/f735808/2147483647/strip/true/crop/363x574+0+0/resize/880x1392!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwkar%2Ffiles%2Fcatcher_in_the_rye_cover.png',
        price: 11.99,
        category: 'Fiction',
        description: 'A novel by J.D. Salinger published in 1951.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'Brave New World',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2vzRDSoHcB5BYuzjkgB9X7sNT1EG2l2JHXA&s',
        price: 10.49,
        category: 'Science Fiction',
        description: 'A novel by Aldous Huxley published in 1932.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'The Road',
        image: 'https://m.media-amazon.com/images/I/51M7XGLQTBL._AC_UF1000,1000_QL80_.jpg',
        price: 13.49,
        category: 'Post-Apocalyptic',
        description: 'A novel by Cormac McCarthy published in 2006.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'Life of Pi',
        image: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9227710_p_v10_ai.jpg',
        price: 12.99,
        category: 'Adventure',
        description: 'A novel by Yann Martel published in 2001.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'The Hobbit',
        image: 'https://m.media-amazon.com/images/M/MV5BMzU0NDY0NDEzNV5BMl5BanBnXkFtZTgwOTIxNDU1MDE@._V1_.jpg',
        price: 11.49,
        category: 'Fantasy',
        description: 'A novel by J.R.R. Tolkien published in 1937.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'The Divine Comedy',
        image: 'https://m.media-amazon.com/images/I/81PNIFR5S1L._AC_UF1000,1000_QL80_.jpg',
        price: 15.49,
        category: 'Classic',
        description: 'An epic poem by Dante Alighieri published in the 14th century.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    },
    {
        name: 'Don Quixote',
        image: 'https://m.media-amazon.com/images/I/71mbJoazlCL._AC_UF1000,1000_QL80_.jpg',
        price: 14.99,
        category: 'Classic',
        description: 'A novel by Miguel de Cervantes published in 1605 and 1615.',
        bookdoc: 'https://firebasestorage.googleapis.com/v0/b/lankareads-9ae56.appspot.com/o/book_doc%2Fbook.pdf?alt=media&token=bf159ac1-568a-4e69-bccf-cd304f0f9c01'
    }
];

// Seeder function
const seedDatabase = async () => {
    try {
        await Book.deleteMany({});
        console.log('🗑 Existing books cleared');

        await Book.insertMany(books);
        console.log('📚 Books inserted successfully');
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

// Run seeder
seedDatabase();